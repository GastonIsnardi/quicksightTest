export interface IAwsAccount {
    AwsAccountId: string,
    Namespace ?: string,
    AuthorizedResourceArns?: string[],
    AllowedDomains: string[],
    ExperienceConfiguration?: {
        DashboardVisual?:{
            InitialDashboardVisualId: {
                DashboardId: string,
                SheetId: string,
                VisualId?: string
            }
        },
        Dashboard?: {
            InitialDashboardId: string,
        }
    },
    SessionTags: [{
        Key: string,
        Value: string,
    }],
    SessionLifetimeInMinutes: number,
    UserArn?: string
}
