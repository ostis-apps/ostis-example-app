/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include <sc-agents-common/utils/GenerationUtils.hpp>
#include <sc-agents-common/utils/AgentUtils.hpp>
#include <sc-agents-common/utils/IteratorUtils.hpp>
#include <sc-agents-common/keynodes/coreKeynodes.hpp>

#include "SubdividingSearchAgent.hpp"

using namespace std;
using namespace utils;

namespace exampleModule
{

SC_AGENT_IMPLEMENTATION(SubdividingSearchAgent)
{
  if (!edgeAddr.IsValid())
    return SC_RESULT_ERROR;

  ScAddr questionNode = m_memoryCtx.GetEdgeTarget(edgeAddr);
  ScAddr param = IteratorUtils::getAnyFromSet(&m_memoryCtx, questionNode);
  if (!param.IsValid())
    return SC_RESULT_ERROR_INVALID_PARAMS;

  ScAddr answer = m_memoryCtx.CreateNode(ScType::NodeConstStruct);
  m_memoryCtx.CreateEdge(ScType::EdgeAccessConstPosPerm, answer, param);
  m_memoryCtx.CreateEdge(ScType::EdgeAccessConstPosPerm, answer, Keynodes::nrel_subdividing);

  ScIterator5Ptr iterator5 = IteratorUtils::getIterator5(&m_memoryCtx, param, Keynodes::nrel_subdividing, false);
  while (iterator5->Next())
  {
    ScAddr sheaf = iterator5->Get(0);
    m_memoryCtx.CreateEdge(ScType::EdgeAccessConstPosPerm, answer, iterator5->Get(1));
    m_memoryCtx.CreateEdge(ScType::EdgeAccessConstPosPerm, answer, sheaf);
    m_memoryCtx.CreateEdge(ScType::EdgeAccessConstPosPerm, answer, iterator5->Get(3));
    GenerationUtils::addSetToOutline(&m_memoryCtx, sheaf, answer);
  }

  ScAddr edgeToAnswer = m_memoryCtx.CreateEdge(ScType::EdgeDCommonConst, questionNode, answer);
  m_memoryCtx.CreateEdge(ScType::EdgeAccessConstPosPerm, scAgentsCommon::CoreKeynodes::nrel_answer, edgeToAnswer);

  AgentUtils::finishAgentWork(&m_memoryCtx, questionNode);
  return SC_RESULT_OK;
}
}
