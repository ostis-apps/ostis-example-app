/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
 */

#pragma once

#include <sc-memory/sc_memory.hpp>


namespace utils
{
class TestUtils
{
public:
  static void getSoleIdtf(
      ScMemoryContext & context, ScAddr const & element, std::string & idtf);

  static unsigned getAmountOfOutgoingMembershipArcs(
      ScMemoryContext & context, ScAddr const & element);
};
}  // namespace utils
