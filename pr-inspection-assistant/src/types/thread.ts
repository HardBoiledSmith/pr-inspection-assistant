import { ThreadContext } from "./threadContext";
import { Comment } from "./comment";

export interface Thread {
    comments: Comment[];
    status: number;
    threadContext: ThreadContext;
    pullRequestThreadContext?: {
        changeTrackingId: number;
        iterationContext: {
            firstComparingIteration: number;
            secondComparingIteration: number;
        };
    };
}