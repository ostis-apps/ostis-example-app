/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/
#include "SubdividingSearchAgent.hpp"

#include "keynodes/keynodes.hpp"

#include <sc-agents-common/utils/GenerationUtils.hpp>
#include <sc-agents-common/utils/IteratorUtils.hpp>

using namespace std;
using namespace utils;

namespace exampleModule
{

ScResult SubdividingSearchAgent::DoProgram(ScAction & action)
{
  ScAddr param = IteratorUtils::getAnyFromSet(&m_context, action);
  if (!param.IsValid())
    return action.FinishUnsuccessfully();

  ScStructure result = m_context.GenerateStructure();
  m_context.GenerateConnector(ScType::ConstPermPosArc, result, param);
  m_context.GenerateConnector(ScType::ConstPermPosArc, result, Keynodes::nrel_subdividing);

  ScIterator5Ptr iterator5 = IteratorUtils::getIterator5(&m_context, param, Keynodes::nrel_subdividing, false);
  while (iterator5->Next())
  {
    ScAddr sheaf = iterator5->Get(0);
    result << iterator5->Get(1) << sheaf << iterator5->Get(3);
    GenerationUtils::addSetToOutline(&m_context, sheaf, result);
  }

  action.SetResult(result);

  return action.FinishSuccessfully();
}

ScAddr SubdividingSearchAgent::GetActionClass() const
{
  return Keynodes::action_find_subdividing;
}
}
