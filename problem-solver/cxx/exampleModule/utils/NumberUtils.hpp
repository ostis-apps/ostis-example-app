/*
 * This source file is part of an OSTIS project. For the latest info, see http://ostis.net
 * Distributed under the MIT License
 * (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
 */

#pragma once

#include <sc-memory/sc_memory.hpp>

namespace utils
{
class NumberUtils
{
public:
  static bool isPositiveInteger(std::string const & str);

  static ScAddr resolveNumber(ScMemoryContext & context, unsigned value);
};
}  // namespace utils
