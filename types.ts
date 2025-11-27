export interface PolicySection {
  id: string;
  title: string;
  content: string;
}

export interface BotMetadata {
  name: string;
  type: string;
  createdDate: string;
  lastUpdated: string;
  creatorName: string;
  supportEmail: string;
}

export interface PrivacyPolicyData {
  metadata: BotMetadata;
  sections: PolicySection[];
}
