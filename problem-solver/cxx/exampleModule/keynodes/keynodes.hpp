/*
 * This source file is part of an OSTIS project. For the latest info, see
 * http://ostis.net Distributed under the MIT License (See accompanying file
 * COPYING.MIT or copy at http://opensource.org/licenses/MIT)
 */

#pragma once

#include <sc-memory/sc_addr.hpp>
#include <sc-memory/sc_keynodes.hpp>

class Keynodes : public ScKeynodes
{
public:
  static inline ScKeynode const action_search_subdividing{"action_search_subdividing", ScType::NodeConstClass};
  static inline ScKeynode const nrel_subdividing{"nrel_subdividing", ScType::NodeConstNoRole};
  static inline ScKeynode const action_search_isomorphic_structures{"action_search_isomorphic_structures", ScType::NodeConstClass};
  static inline ScKeynode const nrel_search_result{"nrel_search_result", ScType::NodeConstNoRole};
  static inline ScKeynode const empty_set{"empty_set", ScType::NodeConstClass};
};
