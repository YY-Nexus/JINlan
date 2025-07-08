// BI分析工具库 - 强大的数据分析功能
export interface DataPoint {
  timestamp: number
  value: number
  category?: string
  metadata?: Record<string, any>
}

export interface TimeSeriesData {
  data: DataPoint[]
  interval: "hour" | "day" | "week" | "month" | "year"
  startTime: number
  endTime: number
}

export interface TrendAnalysis {
  trend: "increasing" | "decreasing" | "stable"
  slope: number
  correlation: number
  confidence: number
  forecast: DataPoint[]
}

export interface AnomalyDetection {
  anomalies: Array<{
    timestamp: number
    value: number
    severity: "low" | "medium" | "high"
    reason: string
  }>
  threshold: number
  method: "zscore" | "iqr" | "isolation"
}

export interface CorrelationAnalysis {
  coefficient: number
  pValue: number
  significance: "weak" | "moderate" | "strong"
  relationship: "positive" | "negative" | "none"
}

export interface SeasonalityAnalysis {
  hasSeasonality: boolean
  period: number
  strength: number
  patterns: Array<{
    period: string
    amplitude: number
    phase: number
  }>
}

export interface StatisticalSummary {
  count: number
  mean: number
  median: number
  mode: number[]
  standardDeviation: number
  variance: number
  min: number
  max: number
  range: number
  quartiles: {
    q1: number
    q2: number
    q3: number
  }
  skewness: number
  kurtosis: number
}

// BI分析引擎类
export class BIAnalyticsEngine {
  private data: Map<string, TimeSeriesData> = new Map()
  private cache: Map<string, any> = new Map()

  // 添加数据集
  addDataset(name: string, data: TimeSeriesData) {
    this.data.set(name, data)
    this.clearCache(name)
  }

  // 获取数据集
  getDataset(name: string): TimeSeriesData | undefined {
    return this.data.get(name)
  }

  // 清理缓存
  private clearCache(datasetName?: string) {
    if (datasetName) {
      const keysToDelete = Array.from(this.cache.keys()).filter((key) => key.startsWith(datasetName))
      keysToDelete.forEach((key) => this.cache.delete(key))
    } else {
      this.cache.clear()
    }
  }

  // 统计摘要
  getStatisticalSummary(datasetName: string): StatisticalSummary | null {
    const cacheKey = `${datasetName}_summary`
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    const dataset = this.data.get(datasetName)
    if (!dataset) return null

    const values = dataset.data.map((d) => d.value).sort((a, b) => a - b)
    const n = values.length

    if (n === 0) return null

    const mean = values.reduce((sum, val) => sum + val, 0) / n
    const median = n % 2 === 0 ? (values[n / 2 - 1] + values[n / 2]) / 2 : values[Math.floor(n / 2)]

    // 计算众数
    const frequency: Record<number, number> = {}
    values.forEach((val) => (frequency[val] = (frequency[val] || 0) + 1))
    const maxFreq = Math.max(...Object.values(frequency))
    const mode = Object.keys(frequency)
      .filter((key) => frequency[Number(key)] === maxFreq)
      .map(Number)

    // 计算方差和标准差
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n
    const standardDeviation = Math.sqrt(variance)

    // 计算四分位数
    const q1 = this.percentile(values, 25)
    const q2 = median
    const q3 = this.percentile(values, 75)

    // 计算偏度和峰度
    const skewness = this.calculateSkewness(values, mean, standardDeviation)
    const kurtosis = this.calculateKurtosis(values, mean, standardDeviation)

    const summary: StatisticalSummary = {
      count: n,
      mean,
      median,
      mode,
      standardDeviation,
      variance,
      min: values[0],
      max: values[n - 1],
      range: values[n - 1] - values[0],
      quartiles: { q1, q2, q3 },
      skewness,
      kurtosis,
    }

    this.cache.set(cacheKey, summary)
    return summary
  }

  // 趋势分析
  analyzeTrend(datasetName: string, forecastPeriods = 10): TrendAnalysis | null {
    const cacheKey = `${datasetName}_trend_${forecastPeriods}`
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    const dataset = this.data.get(datasetName)
    if (!dataset || dataset.data.length < 2) return null

    const data = dataset.data.sort((a, b) => a.timestamp - b.timestamp)
    const n = data.length

    // 线性回归计算斜率
    const xValues = data.map((_, i) => i)
    const yValues = data.map((d) => d.value)

    const { slope, intercept, correlation } = this.linearRegression(xValues, yValues)

    // 确定趋势方向
    let trend: "increasing" | "decreasing" | "stable"
    if (Math.abs(slope) < 0.01) {
      trend = "stable"
    } else if (slope > 0) {
      trend = "increasing"
    } else {
      trend = "decreasing"
    }

    // 计算置信度
    const confidence = Math.abs(correlation)

    // 生成预测
    const forecast: DataPoint[] = []
    const lastTimestamp = data[n - 1].timestamp
    const timeInterval = data.length > 1 ? data[1].timestamp - data[0].timestamp : 86400000 // 默认1天

    for (let i = 1; i <= forecastPeriods; i++) {
      const x = n + i - 1
      const predictedValue = slope * x + intercept
      forecast.push({
        timestamp: lastTimestamp + timeInterval * i,
        value: predictedValue,
      })
    }

    const analysis: TrendAnalysis = {
      trend,
      slope,
      correlation,
      confidence,
      forecast,
    }

    this.cache.set(cacheKey, analysis)
    return analysis
  }

  // 异常检测
  detectAnomalies(datasetName: string, method: "zscore" | "iqr" | "isolation" = "zscore"): AnomalyDetection | null {
    const cacheKey = `${datasetName}_anomalies_${method}`
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    const dataset = this.data.get(datasetName)
    if (!dataset) return null

    const values = dataset.data.map((d) => d.value)
    let anomalies: AnomalyDetection["anomalies"] = []
    let threshold = 0

    switch (method) {
      case "zscore":
        const mean = values.reduce((sum, val) => sum + val, 0) / values.length
        const std = Math.sqrt(values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length)
        threshold = 2.5 // Z-score阈值

        anomalies = dataset.data
          .filter((d) => {
            const zscore = Math.abs((d.value - mean) / std)
            return zscore > threshold
          })
          .map((d) => ({
            timestamp: d.timestamp,
            value: d.value,
            severity: this.getSeverity(Math.abs((d.value - mean) / std), threshold),
            reason: `Z-score: ${((d.value - mean) / std).toFixed(2)}`,
          }))
        break

      case "iqr":
        const sortedValues = [...values].sort((a, b) => a - b)
        const q1 = this.percentile(sortedValues, 25)
        const q3 = this.percentile(sortedValues, 75)
        const iqr = q3 - q1
        const lowerBound = q1 - 1.5 * iqr
        const upperBound = q3 + 1.5 * iqr
        threshold = 1.5

        anomalies = dataset.data
          .filter((d) => d.value < lowerBound || d.value > upperBound)
          .map((d) => ({
            timestamp: d.timestamp,
            value: d.value,
            severity: d.value < q1 - 3 * iqr || d.value > q3 + 3 * iqr ? "high" : "medium",
            reason: `IQR outlier: ${d.value < lowerBound ? "below" : "above"} bounds`,
          }))
        break

      case "isolation":
        // 简化的隔离森林实现
        anomalies = this.isolationForestAnomalies(dataset.data)
        threshold = 0.6
        break
    }

    const detection: AnomalyDetection = {
      anomalies,
      threshold,
      method,
    }

    this.cache.set(cacheKey, detection)
    return detection
  }

  // 相关性分析
  analyzeCorrelation(dataset1Name: string, dataset2Name: string): CorrelationAnalysis | null {
    const cacheKey = `correlation_${dataset1Name}_${dataset2Name}`
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    const data1 = this.data.get(dataset1Name)
    const data2 = this.data.get(dataset2Name)

    if (!data1 || !data2) return null

    // 对齐时间戳
    const alignedData = this.alignTimeSeries(data1.data, data2.data)
    if (alignedData.length < 3) return null

    const values1 = alignedData.map((d) => d.value1)
    const values2 = alignedData.map((d) => d.value2)

    const coefficient = this.pearsonCorrelation(values1, values2)
    const pValue = this.calculatePValue(coefficient, alignedData.length)

    let significance: "weak" | "moderate" | "strong"
    if (Math.abs(coefficient) < 0.3) {
      significance = "weak"
    } else if (Math.abs(coefficient) < 0.7) {
      significance = "moderate"
    } else {
      significance = "strong"
    }

    const relationship = coefficient > 0.1 ? "positive" : coefficient < -0.1 ? "negative" : "none"

    const analysis: CorrelationAnalysis = {
      coefficient,
      pValue,
      significance,
      relationship,
    }

    this.cache.set(cacheKey, analysis)
    return analysis
  }

  // 季节性分析
  analyzeSeasonality(datasetName: string): SeasonalityAnalysis | null {
    const cacheKey = `${datasetName}_seasonality`
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    const dataset = this.data.get(datasetName)
    if (!dataset || dataset.data.length < 24) return null

    const data = dataset.data.sort((a, b) => a.timestamp - b.timestamp)
    const values = data.map((d) => d.value)

    // 使用FFT检测周期性
    const fftResult = this.simpleFFT(values)
    const dominantFrequencies = this.findDominantFrequencies(fftResult)

    const hasSeasonality = dominantFrequencies.length > 0
    const period = hasSeasonality ? Math.round(values.length / dominantFrequencies[0].frequency) : 0
    const strength = hasSeasonality ? dominantFrequencies[0].amplitude : 0

    // 分析不同周期的模式
    const patterns = dominantFrequencies.map((freq) => ({
      period: this.getPeriodName(Math.round(values.length / freq.frequency)),
      amplitude: freq.amplitude,
      phase: freq.phase,
    }))

    const analysis: SeasonalityAnalysis = {
      hasSeasonality,
      period,
      strength,
      patterns,
    }

    this.cache.set(cacheKey, analysis)
    return analysis
  }

  // 数据聚合
  aggregateData(
    datasetName: string,
    interval: "hour" | "day" | "week" | "month",
    aggregationType: "sum" | "avg" | "min" | "max" | "count" = "sum",
  ): TimeSeriesData | null {
    const dataset = this.data.get(datasetName)
    if (!dataset) return null

    const data = dataset.data.sort((a, b) => a.timestamp - b.timestamp)
    const intervalMs = this.getIntervalMs(interval)

    const aggregated: DataPoint[] = []
    const groups = new Map<number, DataPoint[]>()

    // 按时间间隔分组
    data.forEach((point) => {
      const groupKey = Math.floor(point.timestamp / intervalMs) * intervalMs
      if (!groups.has(groupKey)) {
        groups.set(groupKey, [])
      }
      groups.get(groupKey)!.push(point)
    })

    // 聚合每个组
    groups.forEach((points, timestamp) => {
      const values = points.map((p) => p.value)
      let aggregatedValue: number

      switch (aggregationType) {
        case "sum":
          aggregatedValue = values.reduce((sum, val) => sum + val, 0)
          break
        case "avg":
          aggregatedValue = values.reduce((sum, val) => sum + val, 0) / values.length
          break
        case "min":
          aggregatedValue = Math.min(...values)
          break
        case "max":
          aggregatedValue = Math.max(...values)
          break
        case "count":
          aggregatedValue = values.length
          break
        default:
          aggregatedValue = values.reduce((sum, val) => sum + val, 0)
      }

      aggregated.push({
        timestamp,
        value: aggregatedValue,
        metadata: { originalCount: points.length },
      })
    })

    return {
      data: aggregated,
      interval,
      startTime: aggregated[0]?.timestamp || 0,
      endTime: aggregated[aggregated.length - 1]?.timestamp || 0,
    }
  }

  // 预测模型
  forecast(
    datasetName: string,
    periods: number,
    method: "linear" | "exponential" | "seasonal" = "linear",
  ): DataPoint[] | null {
    const dataset = this.data.get(datasetName)
    if (!dataset || dataset.data.length < 3) return null

    const data = dataset.data.sort((a, b) => a.timestamp - b.timestamp)
    const forecast: DataPoint[] = []
    const timeInterval = data.length > 1 ? data[1].timestamp - data[0].timestamp : 86400000

    switch (method) {
      case "linear":
        const trendAnalysis = this.analyzeTrend(datasetName, periods)
        return trendAnalysis?.forecast || null

      case "exponential":
        // 指数平滑
        const alpha = 0.3
        let lastSmoothed = data[0].value

        // 计算平滑值
        for (let i = 1; i < data.length; i++) {
          lastSmoothed = alpha * data[i].value + (1 - alpha) * lastSmoothed
        }

        // 生成预测
        const lastTimestamp = data[data.length - 1].timestamp
        for (let i = 1; i <= periods; i++) {
          forecast.push({
            timestamp: lastTimestamp + timeInterval * i,
            value: lastSmoothed,
          })
        }
        break

      case "seasonal":
        // 季节性预测
        const seasonality = this.analyzeSeasonality(datasetName)
        if (!seasonality?.hasSeasonality) {
          return this.forecast(datasetName, periods, "linear")
        }

        const period = seasonality.period
        const lastTimestamp2 = data[data.length - 1].timestamp

        for (let i = 1; i <= periods; i++) {
          const seasonalIndex = (data.length + i - 1) % period
          const historicalValue = data[seasonalIndex]?.value || data[data.length - 1].value

          forecast.push({
            timestamp: lastTimestamp2 + timeInterval * i,
            value: historicalValue,
          })
        }
        break
    }

    return forecast
  }

  // 辅助方法
  private percentile(sortedArray: number[], percentile: number): number {
    const index = (percentile / 100) * (sortedArray.length - 1)
    const lower = Math.floor(index)
    const upper = Math.ceil(index)
    const weight = index % 1

    if (upper >= sortedArray.length) return sortedArray[sortedArray.length - 1]
    return sortedArray[lower] * (1 - weight) + sortedArray[upper] * weight
  }

  private calculateSkewness(values: number[], mean: number, std: number): number {
    const n = values.length
    const sum = values.reduce((acc, val) => acc + Math.pow((val - mean) / std, 3), 0)
    return (n / ((n - 1) * (n - 2))) * sum
  }

  private calculateKurtosis(values: number[], mean: number, std: number): number {
    const n = values.length
    const sum = values.reduce((acc, val) => acc + Math.pow((val - mean) / std, 4), 0)
    return ((n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))) * sum - (3 * Math.pow(n - 1, 2)) / ((n - 2) * (n - 3))
  }

  private linearRegression(x: number[], y: number[]): { slope: number; intercept: number; correlation: number } {
    const n = x.length
    const sumX = x.reduce((a, b) => a + b, 0)
    const sumY = y.reduce((a, b) => a + b, 0)
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0)
    const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0)
    const sumYY = y.reduce((sum, yi) => sum + yi * yi, 0)

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
    const intercept = (sumY - slope * sumX) / n
    const correlation = (n * sumXY - sumX * sumY) / Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY))

    return { slope, intercept, correlation }
  }

  private pearsonCorrelation(x: number[], y: number[]): number {
    const n = x.length
    const sumX = x.reduce((a, b) => a + b, 0)
    const sumY = y.reduce((a, b) => a + b, 0)
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0)
    const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0)
    const sumYY = y.reduce((sum, yi) => sum + yi * yi, 0)

    const numerator = n * sumXY - sumX * sumY
    const denominator = Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY))

    return denominator === 0 ? 0 : numerator / denominator
  }

  private calculatePValue(correlation: number, n: number): number {
    const t = correlation * Math.sqrt((n - 2) / (1 - correlation * correlation))
    // 简化的p值计算
    return 2 * (1 - this.tDistribution(Math.abs(t), n - 2))
  }

  private tDistribution(t: number, df: number): number {
    // 简化的t分布CDF近似
    const x = df / (df + t * t)
    return 0.5 + 0.5 * Math.sign(t) * this.betaIncomplete(0.5, df / 2, 0.5, x)
  }

  private betaIncomplete(a: number, b: number, c: number, x: number): number {
    // 简化的不完全贝塔函数近似
    return (Math.pow(x, a) * Math.pow(1 - x, b)) / (a * this.beta(a, b))
  }

  private beta(a: number, b: number): number {
    // 简化的贝塔函数近似
    return (this.gamma(a) * this.gamma(b)) / this.gamma(a + b)
  }

  private gamma(z: number): number {
    // 简化的伽马函数近似
    if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * this.gamma(1 - z))
    z -= 1
    let x = 0.99999999999980993
    const coefficients = [
      676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905,
      -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
    ]
    for (let i = 0; i < coefficients.length; i++) {
      x += coefficients[i] / (z + i + 1)
    }
    const t = z + coefficients.length - 0.5
    return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x
  }

  private getSeverity(score: number, threshold: number): "low" | "medium" | "high" {
    if (score < threshold * 1.5) return "low"
    if (score < threshold * 2) return "medium"
    return "high"
  }

  private alignTimeSeries(
    data1: DataPoint[],
    data2: DataPoint[],
  ): Array<{ timestamp: number; value1: number; value2: number }> {
    const aligned: Array<{ timestamp: number; value1: number; value2: number }> = []
    const tolerance = 60000 // 1分钟容差

    data1.forEach((point1) => {
      const matchingPoint = data2.find((point2) => Math.abs(point1.timestamp - point2.timestamp) <= tolerance)
      if (matchingPoint) {
        aligned.push({
          timestamp: point1.timestamp,
          value1: point1.value,
          value2: matchingPoint.value,
        })
      }
    })

    return aligned
  }

  private simpleFFT(values: number[]): Array<{ frequency: number; amplitude: number; phase: number }> {
    // 简化的FFT实现
    const n = values.length
    const result: Array<{ frequency: number; amplitude: number; phase: number }> = []

    for (let k = 0; k < n / 2; k++) {
      let real = 0
      let imag = 0

      for (let i = 0; i < n; i++) {
        const angle = (-2 * Math.PI * k * i) / n
        real += values[i] * Math.cos(angle)
        imag += values[i] * Math.sin(angle)
      }

      const amplitude = Math.sqrt(real * real + imag * imag) / n
      const phase = Math.atan2(imag, real)

      result.push({
        frequency: k,
        amplitude,
        phase,
      })
    }

    return result
  }

  private findDominantFrequencies(
    fftResult: Array<{ frequency: number; amplitude: number; phase: number }>,
  ): Array<{ frequency: number; amplitude: number; phase: number }> {
    return fftResult
      .filter((f) => f.frequency > 0) // 排除DC分量
      .sort((a, b) => b.amplitude - a.amplitude)
      .slice(0, 3) // 取前3个主要频率
      .filter((f) => f.amplitude > 0.1) // 过滤掉幅度太小的
  }

  private getPeriodName(period: number): string {
    if (period <= 24) return "daily"
    if (period <= 168) return "weekly"
    if (period <= 720) return "monthly"
    if (period <= 8760) return "yearly"
    return "custom"
  }

  private getIntervalMs(interval: "hour" | "day" | "week" | "month"): number {
    switch (interval) {
      case "hour":
        return 3600000
      case "day":
        return 86400000
      case "week":
        return 604800000
      case "month":
        return 2592000000
      default:
        return 86400000
    }
  }

  private isolationForestAnomalies(data: DataPoint[]): AnomalyDetection["anomalies"] {
    // 简化的隔离森林实现
    const values = data.map((d) => d.value)
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length
    const std = Math.sqrt(values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length)

    return data
      .filter((d) => {
        const score = Math.abs(d.value - mean) / std
        return score > 2
      })
      .map((d) => ({
        timestamp: d.timestamp,
        value: d.value,
        severity: Math.abs(d.value - mean) / std > 3 ? "high" : "medium",
        reason: `Isolation score: ${(Math.abs(d.value - mean) / std).toFixed(2)}`,
      }))
  }
}

// 工具函数
export const createBIEngine = () => new BIAnalyticsEngine()

export const generateSampleData = (
  count: number,
  startTime: number = Date.now() - 30 * 24 * 60 * 60 * 1000,
  interval = 3600000,
  trend = 0,
  noise = 10,
  seasonality?: { period: number; amplitude: number },
): TimeSeriesData => {
  const data: DataPoint[] = []

  for (let i = 0; i < count; i++) {
    let value = 100 + trend * i + (Math.random() - 0.5) * noise

    // 添加季节性
    if (seasonality) {
      const seasonalComponent = seasonality.amplitude * Math.sin((2 * Math.PI * i) / seasonality.period)
      value += seasonalComponent
    }

    data.push({
      timestamp: startTime + i * interval,
      value: Math.max(0, value), // 确保值为正
    })
  }

  return {
    data,
    interval: "hour",
    startTime,
    endTime: startTime + (count - 1) * interval,
  }
}

export const formatAnalysisResult = (result: any): string => {
  return JSON.stringify(result, null, 2)
}

export const exportToCSV = (data: DataPoint[]): string => {
  const headers = ["timestamp", "value", "date"]
  const rows = data.map((point) => [point.timestamp, point.value, new Date(point.timestamp).toISOString()])

  return [headers, ...rows].map((row) => row.join(",")).join("\n")
}
