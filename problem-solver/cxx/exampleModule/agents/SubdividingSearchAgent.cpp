/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "SubdividingSearchAgent.hpp"

#include <sc-agents-common/utils/GenerationUtils.hpp>
#include <sc-agents-common/utils/IteratorUtils.hpp>

using namespace std;
using namespace utils;

ScAddr SubdividingSearchAgent::GetActionClass() const
{
  return Keynodes::action_search_subdividing;
}

ScResult SubdividingSearchAgent::DoProgram(ScAction & action)
{
  auto const & [paramAddr] = action.GetArguments<1>();
  if (!paramAddr.IsValid())
    return action.FinishWithError();

  ScStructure result = m_context.GenerateStructure();
  result << paramAddr << Keynodes::nrel_subdividing;

  ScIterator5Ptr const iterator5 = m_context.CreateIterator5(
    ScType::Unknown, 
    ScType::Unknown, 
    paramAddr, 
    ScType::Unknown, 
    Keynodes::nrel_subdividing);
  while (iterator5->Next())
  {
    ScAddr const & tupleAddr = iterator5->Get(0);
    result << iterator5->Get(1) << tupleAddr << iterator5->Get(3);
    
    ScIterator3Ptr iterator3 = m_context.CreateIterator3(tupleAddr, ScType::EdgeAccessConstPosPerm, ScType::Unknown);
    while (iterator3->Next())
      result << iterator3->Get(1) << iterator3->Get(2);
  }

  action.SetResult(result);
  return action.FinishSuccessfully();
}
