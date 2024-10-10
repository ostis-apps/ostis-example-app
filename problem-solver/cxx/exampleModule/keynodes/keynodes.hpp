/*
 * This source file is part of an OSTIS project. For the latest info, see
 * http://ostis.net Distributed under the MIT License (See accompanying file
 * COPYING.MIT or copy at http://opensource.org/licenses/MIT)
 */

#pragma once

#include <sc-memory/sc_keynodes.hpp>

namespace exampleModule
{
class Keynodes : public ScKeynodes
{
public:
  static inline ScKeynode const action_find_subdividing{"action_find_subdividing"};

  static inline ScKeynode const nrel_subdividing{"nrel_subdividing"};

  static inline ScKeynode const action_find_isomorphic_structures{"action_find_isomorphic_structures"};

  static inline ScKeynode const nrel_search_result{"nrel_search_result"};

  static inline ScKeynode const empty_set{"empty_set"};
};

}  // namespace exampleModule
