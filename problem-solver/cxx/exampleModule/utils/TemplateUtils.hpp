/*
 * This source file is part of an OSTIS project. For the latest info, see http://ostis.net
 * Distributed under the MIT License
 * (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
 */

#pragma once

#include <sc-memory/sc_memory.hpp>

#include "dataStructures/ConnectorTemplateInfo.hpp"
#include "dataStructures/WeightTemplateInfo.hpp"

namespace utils
{
class TemplateUtils
{
public:
  static void getConnectorTemplateInfo(
      ScMemoryContext & context,
      ScAddr const & connectorTemplateAddr,
      ConnectorTemplateInfo & templateInfo);

  static void getWeightTemplateInfo(
      ScMemoryContext & context,
      ScAddr const & connectorWeightTemplateAddr,
      WeightTemplateInfo & templateInfo);
};
}  // namespace utils
