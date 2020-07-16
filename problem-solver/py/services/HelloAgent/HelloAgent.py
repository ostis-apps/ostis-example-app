from common import ScModule, ScAgent, ScEventParams
from sc import *


class HelloAgent(ScAgent):

    kHello = "hello"
    kWorld = "world"

    def RunImpl(self, evt: ScEventParams) -> ScResult: 
        print("I say hello when created output edge from \'hello\' keynode")
        return ScResult.Ok
