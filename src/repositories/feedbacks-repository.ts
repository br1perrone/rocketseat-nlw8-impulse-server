export interface FeedbackCreateData {
    comment: string;
    screenshot?: string;
    type: string;
}

export interface FeedbacksRepository {
    create: (data :FeedbackCreateData) => Promise<void>;
}