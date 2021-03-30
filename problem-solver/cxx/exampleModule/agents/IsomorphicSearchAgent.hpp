#pragma once

#include <sc-memory/kpm/sc_agent.hpp>

#include "keynodes/keynodes.hpp"
#include "IsomorphicSearchAgent.generated.hpp"

namespace exampleModule
{

class IsomorphicSearchAgent : public ScAgent
{
  SC_CLASS(Agent, Event(Keynodes::question_find_isomorphic_structures, ScEvent::Type::AddOutputEdge))
  SC_GENERATED_BODY()
};

} // namespace exampleModule
