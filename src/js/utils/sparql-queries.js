/**
 * Builds the query that retrieve the list of all classifications.
 */
const buildGetClassificationListQuery = () => `
  PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX skos:<http://www.w3.org/2004/02/skos/core#>
  SELECT ?classification ?code ?label WHERE {
    ?classification rdf:type skos:ConceptScheme ; skos:notation ?code ; skos:prefLabel ?label .
  } ORDER BY ?code
 `

/**
 * Builds the query that gets the details about a classification.
 */
const buildGetClassificationDetailsQuery = uri => `
  PREFIX dcterms: <http://purl.org/dc/terms/>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  SELECT ?code ?label ?issued WHERE {
    <${uri}> skos:notation ?code ; skos:prefLabel ?label ; dcterms:issued  ?issued .
  }
`

/**
 * Builds the query that gets the levels of a classification.
 * Using SPARQL 1.1 property paths, see https://www.w3.org/TR/sparql11-query/#propertypaths
 */
const buildGetClassificationLevelsQuery = uri => `
  PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX skos:<http://www.w3.org/2004/02/skos/core#>
  PREFIX xkos:<http://rdf-vocabulary.ddialliance.org/xkos#>
  SELECT ?level ?depth ?label
  WHERE {
    <${uri}> xkos:hasLevels/rdf:rest*/rdf:first ?level .
    ?level xkos:depth ?depth ; skos:prefLabel ?label .
  } ORDER BY ?depth
`

/**
 * Builds the query that gets the list of items of a givent level.
 */

const buildGetLevelItemsQuery = uri => `
  PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX skos:<http://www.w3.org/2004/02/skos/core#>
  SELECT ?item ?code ?label WHERE {
    <${uri}> skos:member ?item .
    ?item skos:notation ?code ; skos:prefLabel ?label .
  } ORDER BY ?code
`

export default {
  buildGetClassificationListQuery,
  buildGetClassificationDetailsQuery,
  buildGetClassificationLevelsQuery,
  buildGetLevelItemsQuery
}
