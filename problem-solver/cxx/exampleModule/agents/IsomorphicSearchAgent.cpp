#include <iostream>

#include <sc-memory/sc_memory.hpp>
#include <sc-memory/sc_stream.hpp>
#include <sc-memory/sc_template_search.cpp>

#include "IsomorphicSearchAgent.hpp"
#include <sc-agents-common/utils/AgentUtils.hpp>

using namespace std;
using namespace utils;

namespace exampleModule
{

SC_AGENT_IMPLEMENTATION(IsomorphicSearchAgent)
{
  ScLog *logger = ScLog::GetInstance();

  if (!edgeAddr.IsValid())
    return SC_RESULT_ERROR;

  ScAddr questionNode = ms_context->GetEdgeTarget(edgeAddr);

  ScIterator3Ptr iterator3 = ms_context->Iterator3(questionNode, ScType::EdgeAccessConstPosPerm, ScType::Unknown);
  ScAddr templateStructNode;
  if (iterator3->Next())
  {
    templateStructNode = iterator3->Get(2);
  }

  if (!templateStructNode.IsValid())
  {
    logger->Message(ScLog::Type::Error, "There are invalid params");
    return SC_RESULT_ERROR_INVALID_PARAMS;
  }

  ScTemplate scTemplate;

  try
  {
    ms_context->HelperBuildTemplate(scTemplate, templateStructNode);
  }
  catch (exception & exc)
  {
    logger->Message(ScLog::Type::Error, exc.what());
    return SC_RESULT_ERROR;
  }

  ScTemplateSearchResult result;
  ScAddr answer = ms_context->CreateNode(ScType::NodeConstStruct);

  if (ms_context->HelperSearchTemplate(scTemplate, result))
  {
    for (size_t i = 0; i < result.Size(); i++)
    {
      ScTemplateSearchResultItem resultItem = result[i];

      for (size_t j = 0; j < resultItem.Size(); j++)
        if (!ms_context->HelperCheckEdge(answer,
                                         resultItem[j],
                                         ScType::EdgeAccessConstPosPerm))
          ms_context->CreateEdge(ScType::EdgeAccessConstPosPerm,
                                 answer,
                                 resultItem[j]);
    }

    logger->Message(ScLog::Type::Info, "Structures have been found");
  }
  else
  {
    logger->Message(ScLog::Type::Info, "Structures have not been found");
  }

  utils::AgentUtils::finishAgentWork(ms_context.get(), questionNode, answer);

  return SC_RESULT_OK;
}

} // namespace exampleModule
