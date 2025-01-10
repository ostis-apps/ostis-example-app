#include "PathSearcher.hpp"

#include "keynodes/Keynodes.hpp"
#include "utils/NumberUtils.hpp"

PathSearcher::PathSearcher(ScMemoryContext * context)
  : context(context)
{
}

void PathSearcher::findPath(
    ScAddr const & graph,
    ScAddr const & startNode,
    ScAddr const & endNode,
    ScAddr const & connectorTemplateAddr,
    ConnectorTemplateKeyElements const & connectorTemplateKeyElements,
    ScAddr const & connectorWeightTemplateAddr,
    WeightTemplateKeyElements const & weightTemplateKeyElements,
    unsigned & pathLength,
    ScAddrVector & path)
{
  ScAddrQueue vertexesToCheck;
  ScAddrSet usedConnectors;
  std::map<ScAddr, unsigned, ScAddrLessFunc> pathLengthToVertexes;
  std::map<ScAddr, ScAddrVector, ScAddrLessFunc> pathsToVertexes;

  vertexesToCheck.emplace(startNode);

  while (!vertexesToCheck.empty())
  {
    ScAddr const & currnetVertex = vertexesToCheck.front();
    vertexesToCheck.pop();

    ScAddrToValueUnorderedMap<ScAddr> neighborsWithConnectors =
        getNeighborsWithConnectors(graph, currnetVertex, connectorTemplateAddr, connectorTemplateKeyElements);

    for (auto const & neighborWithConnector : neighborsWithConnectors)
    {
      ScAddr const & connector = neighborWithConnector.second;
      if (usedConnectors.find(connector) != usedConnectors.cend())
        continue;

      ScAddr const & neighbor = neighborWithConnector.first;
      unsigned const connectorWeight =
          getConnectorWeights(connector, connectorWeightTemplateAddr, weightTemplateKeyElements);

      if (pathLengthToVertexes.find(neighbor) == pathLengthToVertexes.cend())
      {
        pathLengthToVertexes[neighbor] = pathLengthToVertexes[currnetVertex] + connectorWeight;

        pathsToVertexes[neighbor] = pathsToVertexes[currnetVertex];
        pathsToVertexes[neighbor].emplace_back(neighbor);
      }
      else
      {
        unsigned newPathLength = pathLengthToVertexes[currnetVertex] + connectorWeight;
        if (newPathLength < pathLengthToVertexes[neighbor])
        {
          pathLengthToVertexes[neighbor] = newPathLength;

          pathsToVertexes[neighbor] = pathsToVertexes[currnetVertex];
          pathsToVertexes[neighbor].emplace_back(neighbor);
        }
      }
      vertexesToCheck.emplace(neighbor);
      usedConnectors.emplace(connector);
    }
  }

  if (pathLengthToVertexes.find(endNode) == pathLengthToVertexes.end())
    SC_THROW_EXCEPTION(utils::ExceptionItemNotFound, "Target vertex not reached");

  pathLength = pathLengthToVertexes[endNode];
  path.clear();
  path.emplace_back(startNode);
  path.insert(path.end(), pathsToVertexes[endNode].begin(), pathsToVertexes[endNode].end());
}

ScAddrToValueUnorderedMap<ScAddr> PathSearcher::getNeighborsWithConnectors(
    ScAddr const & graph,
    ScAddr const & startNode,
    ScAddr const & connectorTemplateAddr,
    ConnectorTemplateKeyElements const & connectorTemplateKeyElements)
{
  ScTemplateParams connectorTemplateParams;
  connectorTemplateParams.Add(connectorTemplateKeyElements.connectorStartVariable, startNode);
  ScTemplate connectorTemplate;
  context->BuildTemplate(connectorTemplate, connectorTemplateAddr, connectorTemplateParams);

  ScAddrToValueUnorderedMap<ScAddr> neighborsWithStepWeights;

  context->SearchByTemplate(
      connectorTemplate,
      [&](ScTemplateResultItem const & item)
      {
        ScAddr const & neighbor = item[connectorTemplateKeyElements.connectorEndVariable];
        ScAddr const & connector = item[connectorTemplateKeyElements.connectorVariable];
        neighborsWithStepWeights[neighbor] = connector;
      },
      [this, &graph](ScAddr const & elementAddr) -> bool
      {
        return context->CheckConnector(graph, elementAddr, ScType::ConstPermPosArc);
      });

  return neighborsWithStepWeights;
}

unsigned PathSearcher::getConnectorWeights(
    ScAddr const & connector,
    ScAddr const & connectorWeightTemplateAddr,
    WeightTemplateKeyElements const & weightTemplateKeyElements)
{
  ScTemplateParams connectorWeightTemplateParams;
  connectorWeightTemplateParams.Add(weightTemplateKeyElements.measuredObjectVariable, connector);
  ScTemplate connectorWeightTemplate;
  context->BuildTemplate(connectorWeightTemplate, connectorWeightTemplateAddr, connectorWeightTemplateParams);

  unsigned weight;
  bool isFound = false;
  context->SearchByTemplateInterruptibly(
      connectorWeightTemplate,
      [this, &isFound, &weightTemplateKeyElements, &weight](
          ScTemplateResultItem const & item) -> ScTemplateSearchRequest
      {
        isFound = true;

        weight = getNumberValue(item[weightTemplateKeyElements.numberVariable]);

        return ScTemplateSearchRequest::STOP;
      });

  if (!isFound)
    SC_THROW_EXCEPTION(utils::ExceptionItemNotFound, "connector weight is not found");

  return weight;
}

unsigned PathSearcher::getNumberValue(ScAddr const & number)
{
  ScIterator5Ptr idtfsIterator = context->CreateIterator5(
      number, ScType::ConstCommonArc, ScType::ConstNodeLink, ScType::ConstPermPosArc, Keynodes::nrel_idtf);
  while (idtfsIterator->Next())
  {
    ScAddr const & idtfLink = idtfsIterator->Get(2);
    std::string idtfString;
    context->GetLinkContent(idtfLink, idtfString);
    if (utils::NumberUtils::isNumber(idtfString))
      return atoi(idtfString.c_str());
  }

  SC_THROW_EXCEPTION(utils::ExceptionItemNotFound, "connector weight value is not found");
}
