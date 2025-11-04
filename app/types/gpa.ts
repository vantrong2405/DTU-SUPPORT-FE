export interface GraduationClassification {
  rankKey: string
  minGpa: number
  maxGpa: number
  badgeColor: string
  iconName: string
}

export interface CreditDistribution {
  id: string
  credits: number
  gradeValue: string
}
