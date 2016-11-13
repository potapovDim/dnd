import _ from 'lodash'
export const calculateTubes = buildingsWithPositions => {
  let tubes = {}
  if (Object.keys(buildingsWithPositions).length === 7) {
    tubes['first'] = 2 * Math.sqrt(
        _.reduce(_.omit(buildingsWithPositions, ['firstBuild']), (result, value, key)=> {
          result += value.waterNeedingForThisBuild
          return result
        }, 0) / (Math.PI))
    tubes['second'] = 2 * Math.sqrt(
        _.reduce(_.omit(buildingsWithPositions, ['firstBuild', 'secondBuild']), (result, value, key)=> {
          result += value.waterNeedingForThisBuild
          return result
        }, 0) / (Math.PI))
    tubes['third'] = 2 * Math.sqrt(
        _.reduce(_.omit(buildingsWithPositions, ['firstBuild', 'secondBuild', 'thirdBuid']), (result, value, key)=> {
          result += value.waterNeedingForThisBuild
          return result
        }, 0) / (Math.PI))
    tubes['fourth'] = 2 * Math.sqrt(
        _.reduce(_.omit(buildingsWithPositions, ['firstBuild', 'secondBuild', 'thirdBuid', 'fourthBuild']),
          (result, value, key)=> {
            result += value.waterNeedingForThisBuild
            return result
          }, 0) / (Math.PI))
    tubes['fifth'] = 2 * Math.sqrt(
        _.reduce(
          _.omit(buildingsWithPositions, ['firstBuild', 'secondBuild', 'thirdBuid', 'fourthBuild', 'fifthBuild']),
          (result, value, key)=> {
            result += value.waterNeedingForThisBuild
            return result
          }, 0) / (Math.PI))
    tubes['sixth'] = 2 * Math.sqrt(
        _.reduce(
          _.omit(buildingsWithPositions,
            ['firstBuild', 'secondBuild', 'thirdBuid', 'fourthBuild', 'fifthBuild', 'sixtBuild']),
          (result, value, key)=> {
            result += value.waterNeedingForThisBuild
            return result
          }, 0) / (Math.PI))
    const tubesAfterAssert = _.mapValues(tubes, val=> {
      if (val <= 0.04) {
        return 0.04
      }
      else if (0.04 < val && val <= 0.05) {
        return 0.05
      }
      else if (0.05 < val && val <= 0.08) {
        return 0.08
      }
      else if (0.08 < val && val <= 0.1) {
        return 0.1
      }
    })
    return tubesAfterAssert
  }
}