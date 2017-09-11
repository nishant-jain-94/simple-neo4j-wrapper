# Simple-Neo4j-Wrapper [![Build Status](https://travis-ci.org/nishant-jain-94/simple-neo4j-wrapper.svg?branch=master)](https://travis-ci.org/nishant-jain-94/simple-neo4j-wrapper.svg?branch=master) [![dependencies](https://david-dm.org/nishant-jain-94/simple-neo4j-wrapper.svg)](https://david-dm.org) [![Coverage](https://coveralls.io/repos/github/nishant-jain-94/simple-neo4j-wrapper/badge.svg?branch=master)](https://coveralls.io/github/nishant-jain-94/simple-neo4j-wrapper?branch=master)

[![NPM](https://nodei.co/npm/simple-neo4j-wrapper.png)](https://nodei.co/npm/simple-neo4j-wrapper/)

Simple-Neo4j-Wrapper is a very simple wrapper around neo4j-driver build at [Stackroute](http://www.stackroute.in/), which provides you the ability to create a singleton connection to Neo4j.

Simple-Neo4j-Wrapper also provides you with other helper methods to ease your task of querying against Neo4j.

## How To Use

```
const Neo4jWrapper = require('simple-neo4j-wrapper');
const neo4j = new Neo4jWrapper('bolt://localhost', 'neo4j', 'password');


// Query Executor is used to execute raw Cypher queries
// against Neo4j.

neo4j.queryExecutor('MATCH (n) return count(n)', (err, results) => {
  if(!err) {
    console.log(results);
  }
});
```

# Methods #

## bulkMergeOrCreateNode ##

Merge or Create Node in bulk.

### Signature ###

```
neo4j.bulkMergeOrCreateNode(nodesToBeCreated, callback)
```

### Example ###

```
// A collection of Nodes to be created.
const nodes = [
  {
    properties: {
      label: 'concept',
      name: 'AngularJS',
    },
    options: {
      uniqueConstraintsOn: ['name'],
    },
  },
  {
    properties: {
      label: 'concept',
      name: 'AngularJS1',
    },
    options: {
      uniqueConstraintsOn: ['name'],
    },
  },
];

// Merges Or Creates Nodes in bulk.
neo4j.bulkMergeOrCreateNode(nodes, (err, results) => {
  console.log(results);
});

```

## bulkMergeOrCreateRelation ##
Merge or Create Relations in bulk.

### Signature ###

```
neo4j.bulkMergeOrCreateRelations(nodesToBeCreated, callback);
```

### Example ###

```
const triples = [{
      source: {
        properties: {
          label: 'conceptTest',
          name: 'Javascript',
        },
        options: {
          uniqueConstraintsOn: [
            'name',
          ],
        },
      },
      target: {
        properties: {
          label: 'conceptTest',
          name: 'AngularJS',
        },
        options: {
          uniqueConstraintsOn: [
            'name',
          ],
        },
      },
      relation: {
        properties: {
          relation: 'subConceptOf',
        },
        options: {
          uniqueConstraintsOn: [
            'name',
          ],
        },
      },
    }];

    neo4j.bulkMergeOrCreateRelation(triples, (err, results) => {
      console.log(results);
    });
```
## bulkQueryExecutor ##
Executes Cypher Query in bulk.

### Signature ###
```
neo4j.bulkQueryExecutor(queries, callback);
```

### Example ###
```
const queries = [
  'MATCH (n:concept) return (n)',
  'MATCH (n:content) return (n)',
];

neo4j.bulkQueryExecutor(queries, callback);
```

## createNode ##
Creates a Node in Neo4j.

### Signature ###
```
neo4j.createNode(nodeToBeCreated, callback);
```

### Example ###

```
const node = { label: 'concept', name: 'AngularJS', domain: 'frontend', level: 10, importance: 'high'};

neo4j.createNode(node, (error, {records}) => {
  console.log(records);
});
```

## createNodesFromCsv ##
Creates Nodes From CSV

### Signature ###
```
neo4j.createNodesFromCsv(pathOfTheCsvFile, callback);
```

### Example ###
```
neo4j.createNodesFromCsv('./myNodes.csv', callback);
```

## createRelationsFromCsv ##
Create Relations From CSV

### Signature ###

```
neo4j.createRelationsFromCsv(pathOfTheCsvFile, callback);
```

### Example ###

```
neo4j.createRelationsFromCsv('./myRelations.csv', callback);
```

## createNodesAndRelationsFromTriple ##
Creates Nodes And Relations From Triple.

### Signature ###

```
neo4j.createNodesAndRelationsFromTriple(triple, callback);
```
### Example ###
```
const triple = {
  propertiesOfSubject: {
    label: 'testConcept',
    name: 'AngularJS',
  },
  propertiesOfObject: {
    label: 'testConcept',
    name: 'TwoWayBinding',
  },
  propertiesOfPredicate: {
    relation: 'subConceptOf',
  },
};

neo4j.createNodesAndRelationsFromTriple(triple, callback);
```
## createRelation ##
Create Relations in Neo4j.

### Signature ###
```
neo4j.createRelations(relation, callback);
```

### Example ###

```
const relation = {
  nameOfSourceNode: 'AngularJS',
  labelOfSourceNode: 'concept',
  relation: 'subConceptOf',
  nameOfTargetNode: 'MEANStack',
  labelOfTargetNode: 'concept',
  isNecessary: true,
  importance: 'high',
};

neo4j.createRelations(relation, callback);
```

## deleteAllNodes ##
Deletes all the nodes in Neo4j.

### Signature ###
```
neo4j.deleteAllNodes(callback);
```

### Example ###
```
neo4j.deleteAllNodes(callback);
```

## dropAllConstraints ##
Drops all the constraints in Neo4j.

### Signature ###
```
neo4j.dropAllConstraints(callback);
```

### Example ###
```
neo4j.dropAllConstraints(callback);
```

## findNodes ##
Find Nodes in Neo4j.

### Signature ###
```
neo4j.findNodes(nodeToBeFound, callback);
```

### Example ###
```
const nodeToBeFound = {label: 'concept', name: 'AngularJS', domain: 'frontend', level: 10, importance: 'high'};

neo4j.findNodes(nodeToBeFound, (err, nodes) => {
  console.log(nodes);
});

```

## findOrCreateNode ##
Find or Creates Node.

### Signature ###
```
neo4j.findOrCreateNode(node, callback);
```

### Example ###
```
neo4j.findOrCreateNode(node, (err, foundOrCreatedNode) => console.log(foundOrCreatedNode));
```

## getCountOfAllNodes ##
Gets count of all the node in Neo4j.

### Signature ###
```
neo4j.getCountOfAllNodes(callback);
```

### Example ###
```
neo4j.getCountOfAllNodes((err, result) => {
  console.log(result.records[0]._fieldLookup['count(n)']);
})
```

## mergeOrCreateNode ##
Merge or Create Node in Neo4j.

### Signature ###
```
neo4j.mergeOrCreateNode(node, callback);
```

### Example ###
```
const node = {
  properties: {
    label: 'concept',
    name: 'AngularJS',
    domain: 'frontend',
    level: 10,
    importance: 'high',
  },
  options: {
    uniqueConstraintsOn: ['name'],
  },
};

neo4j.mergeOrCreateNode(node, (err, result) => console.log(result));
```

## mergeOrCreateRelation ##
Merge or Create Relation.

### Signature ###
```
neo4j.mergeOrCreateRelation(relation, callback);
```

### Example ###
```
const triple = {
  source: {
    properties: {
      label: 'conceptTest',
      name: 'Javascript',
    },
    options: {
      uniqueConstraintsOn: [
        'name',
      ],
    },
  },
  target: {
    properties: {
      label: 'conceptTest',
      name: 'AngularJS',
    },
    options: {
      uniqueConstraintsOn: [
        'name',
      ],
    },
  },
  relation: {
    properties: {
      relation: 'subConceptOf',
    },
    options: {
      uniqueConstraintsOn: [
        'name',
      ],
    },
  },
};

neo4j.mergeOrCreateRelation(triple, callback);
```

## queryExecutor ##
Executes Query in Neo4j.

### Signature ###
```
neo4j.queryExecutor(query, callback);
```

### Example ###
```
neo4j.queryExecutor('MATCH (n) return count(n)', (err, results) => {
  if(!err) {
    console.log(results);
  }
});
```

## queryExecutorWithParams ##
Executes Query With Parameters in Neo4j.

### Signature ###
```
neo4j.queryExecutorWithParams(query, params, callback);
```

### Example ###
```
neo4j.queryExecutorWithParams(query, params, callback);
```

# Things to be Updated #

1. Improvising on the results returned from all the API Methods.
2. Improvising on parameters passed to each of the API Methods.
3. Adding better use cases and examples.