This is an agent that searches minimal path between two nodes of weighted graph. Connectors can be arbitrary constructions defined by a template. Construction that define the weights of these connectors specified in a similar way. 

**Action class:**

`action_find_minimum_path`

**Parameters:**

1. `graph` - a structure in which the path must be found.
2. `start node`
3. `end node` 
4. `connector template` - a template of connectors between nodes. See its description below.
5. `connector weight template` - a template of connectors weights. See its description below.

**Comment:**

* Connector template should contain 3 key elements variables connected to it with rrel_1 - rrel_3 relations:
    * Variable representing current node (connected with rrel_1);
    * Variable representing neighbor (adjacent to the current node) node (connected with rrel_2);
    * Variable representing connector itself (connected with rrel_3).

* Connector weight template should contain 2 key elements variables connected to it with rrel_1 and rrel_2 relations:
    * Variable representing connector (connected with rrel_1);
    * Variable representing number with connector weight (connected with rrel_2). Note that This agent does not perform conversion of measurement units and depends on the fact that numbers found by via this template are represent measurement in the same units for each connector.

* Result of this agent work is a path for start to end node with its weight if such path exists. See example below.

### Examples

Example of an input structure:

<img src="../images/path_finding_agent_input.png"></img>

Example of an output structure:

<img src="../images/path_finding_agent_output.png"></img>

Example of graph:
```
road_graph = [*
  concept_city
    -> city_a;
    -> city_b;
    -> city_c;
    -> city_d;;

  road_a_b
   <- concept_road;
   -> rrel_end: city_a;
   -> rrel_end: city_b;
   <- 100_km (* <- concept_length;; *);;

  road_b_c
   <- concept_road;
   -> rrel_end: city_b;
   -> rrel_end: city_c;
   <- 200_km (* <- concept_length;; *);;

  road_a_c
   <- concept_road;
   -> rrel_end: city_a;
   -> rrel_end: city_c;
   <- 150_km (* <- concept_length;; *);;

  road_c_d
   <- concept_road;
   -> rrel_end: city_c;
   -> rrel_end: city_d;
   <- 300_km (* <- concept_length;; *);;

  sc_node_class
    -> concept_number;;

  sc_node_non_role_relation
    -> nrel_measurment_in_km;;

  300_km
    => nrel_measurment_in_km: number_300 (* <- concept_number;; *);;

  150_km
    => nrel_measurment_in_km: number_150 (* <- concept_number;; *);;

  100_km
    => nrel_measurment_in_km: number_100 (* <- concept_number;; *);;

  200_km
    => nrel_measurment_in_km: number_200 (* <- concept_number;; *);;
*];;
```

Example of connector template:
```
connector_template = [*
  _road
    <-_ concept_road;
    _-> rrel_end:: _current_city;
    _-> rrel_end:: _next_city;;
*];;
connector_template
  <- concept_connector_template;
  -> rrel_1: rrel_key_sc_element: _current_city;
  -> rrel_2: rrel_key_sc_element: _next_city;
  -> rrel_3: rrel_key_sc_element: _road;;
```

Example of connector weight template:
```
connector_weight_template = [*
  _road
    <-_ _Xkm (* <-_ concept_length;; *);;
    
  _Xkm
    _=> nrel_measurment_in_km:: _X_number (* <-_ concept_number;; *);;
*];;
connector_weight_template
  -> rrel_1: rrel_key_sc_element: _road;
  -> rrel_2: rrel_key_sc_element: _X_number;;
```

### Agent implementation language
C++

### Result

Possible result codes:

* `sc_result_ok`- path found;
* `sc_result_error`- internal error.
