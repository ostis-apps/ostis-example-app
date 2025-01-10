/*
 * This source file is part of an OSTIS project. For the latest info, see http://ostis.net
 * Distributed under the MIT License
 * (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
 */

#pragma once

#include <sc-memory/sc_memory.hpp>

#include "structures/ConnectorTemplateKeyElements.hpp"
#include "structures/WeightTemplateKeyElements.hpp"

namespace utils
{
class TemplateUtils
{
public:
  static void getConnectorTemplateKeyElements(
      ScMemoryContext & context,
      ScAddr const & connectorTemplateAddr,
      ConnectorTemplateKeyElements & elements);

  static void getWeightTemplateKeyElements(
      ScMemoryContext & context,
      ScAddr const & connectorWeightTemplateAddr,
      WeightTemplateKeyElements & elements);
};
}  // namespace utils