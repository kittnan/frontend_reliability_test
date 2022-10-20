export interface TestingConditionForm {
  highTemp?: string | null,
  lowTemp?: string | null,
  humidity?: string | null,
  hz?: string | null,
  acceleration?: string | null,
  direction?: directionForm | null,
  timeCycle?: string | null,
  cycle?: string | null,
  operate?: string | null,
  sampleNo?: string | null,
  qty?: string | null,
  timeInspection?: string | null,
  timeReport?: string | null,

}

interface directionForm {
  x: number | string,
  y: number | string,
  z: number | string
}
