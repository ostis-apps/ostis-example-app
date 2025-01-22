/*
 * This source file is part of an OSTIS project. For the latest info, see
 * http://ostis.net Distributed under the MIT License (See accompanying file
 * COPYING.MIT or copy at http://opensource.org/licenses/MIT)
 */

#pragma once

#include "sc-memory/sc_memory.hpp"

#include "dataStructures/ConnectorTemplateInfo.hpp"
#include "dataStructures/WeightTemplateInfo.hpp"
#include "dataStructures/ConnectorInfo.hpp"
#include "dataStructures/PathInfo.hpp"

class PathSearcher
{
public:
  explicit PathSearcher(ScMemoryContext * context);

  void findPath(
      ScAddr const & graph,
      ScAddr const & startNode,
      ScAddr const & endNode,
      ConnectorTemplateInfo const & connectorTemplateInfo,
      WeightTemplateInfo const & weightTemplateInfo,
      PathInfo & pathInfo) const;

private:
  ScMemoryContext * context;

  void getNeighborsWithConnectorsInfo(
      ScAddr const & graph,
      ScAddr const & startNode,
      ConnectorTemplateInfo const & connectorTemplateInfo,
      WeightTemplateInfo const & weightTemplateInfo,
      ScAddrToValueUnorderedMap<ConnectorInfo> & neighborsWithConnectorsInfo) const;

  unsigned getConnectorWeight(ScAddr const & connector, WeightTemplateInfo const & weightTemplateInfo) const;

  unsigned getNumberValue(ScAddr const & number) const;
};
