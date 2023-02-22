import { gql } from '@apollo/client';

export const GQL_TOOLBOX_QUERY = gql`
uery queryToolboxMeeting ($siteId: String!, $number: String){
    toolboxMeeting(
      siteId: $siteId
      number: $number
    ) {
      siteId
      number
      system
      systemBranch
      project
      area
      laborAmount
      meetingDatetime
      meetingPlace
      primeContractCorp
      primeContractStaff
      minorContractCorpOne
      minorContractOneStaff
      minorContractCorpTwo
      minorContractTwoStaff
      minorContractCorpThree
      minorContractThreeStaff
      workContent
      workPlace
      physicalFall
      scrape
      objectFall
      foreignEnterEye
      heatTouch
      microthermTouch
      noise
      eletricDisaster
      collapse
      radiation
      chemicalBurn
      chemicalInhalation
      fireDisaster
      explode
      otherDisasterNone
      hypoxia
      biologicalHazard
      outdoorHeat
      otherDisaster
      chemicalNone
      chemicalInclude
      gasNone
      gasInclude
      head
      headWorkspace
      headElectric
      headPlastic
      eye
      eyeMechanical
      eyeRadia
      ear
      earEarplugs
      earEarmuffs
      breathe
      breatheDust
      breatheFiltration
      breatheScba
      breathePapr
      breathOxygen
      hand
      handCut
      handGrand
      handHeat
      handElectirc
      haneChemical
      foot
      footNormal
      footChemical
      body
      bodyBelt
      bodyMask
      bodyClothing
      bodyVest
      fall
      fallTrestleLadder
      fallTravelLadder
      fallScaffold
      fallAerialVehicle
      fallSafeLine
      fallCage
      fallFence
      fallCover
      fallSafeNet
      fallWarningFence
      fallArrestor
      electric
      electricBreaker
      electricShockPrevention
      electricElectroscope
      fire
      fireExtinguisher
      fireBlanket
      fireBackfire
      oxygen
      oxygenVentilation
      oxygenLifeDetection
      oxygenGasDetection
      oxygenLifting
      oxygenRescue
      ohterPrevention
      publicityMatters
      contentConformBeforeWork
      contentConformDuringWork
      contentConformSupervisor
      safetyMeasureBeforeWork
      safetyMeasureDuringWork
      safetyMeasureKnockOff
      safetyMeasureSupervisor
      staffStateBeforeWork
      staffStateDuringWork
      staffStateKnockOff
      staffStateSupervisor
      principleOnSiteBeforeWork
      principleOnSiteDuringWork
      principleOnSiteKnockOff
      principleOnSiteSupervisor
      restorationKnockOff
      restorationSupervisor
      abnormal
      abnormalRecord
      contractingCorpStaffSignatureFirst {
        no
        path
        time
        owner
      }
      contractingCorpStaffSignatureSecond {
        no
        path
        time
        owner
      }
      contractingCorpStaffSignatureThird {
        no
        path
        time
        owner
      }
      systemEngineerSignature {
        no
        path
        time
        owner
      }
      primeAppearSignature {
        no
        path
        time
        owner
        stype
      }
      viceFirstAppearSignature {
        no
        path
        time
        owner
        stype
      }
      viceSecondAppearSignature {
        no
        path
        time
        owner
        stype
      }
      viceThirdAppearSignature {
        no
        path
        time
        owner
        stype
      }
    }
  }  
`

export const GQL_TOOLBOX_UPDATE = gql`
    mutation utm(
        $abnormal: Boolean
        $abnormalRecord: String
        $area: String
        $biologicalHazard: Boolean
        $body: Boolean
        $bodyBelt: Boolean
        $bodyClothing: Boolean
        $bodyMask: Boolean
        $bodyVest: Boolean
        $breathOxygen: Boolean
        $breathe: Boolean
        $breathePapr: Boolean
        $breatheScba: Boolean
        $breatheDust: Boolean
        $breatheFiltration: Boolean
        $chemicalBurn: Boolean
        $chemicalInclude: String
        $chemicalInhalation: Boolean
        $chemicalNone: Boolean
        $collapse: Boolean
        $contentConformSupervisor: Boolean
        $contentConformBeforeWork: Boolean
        $contentConformDuringWork: Boolean
        $contractingCorpStaffSignatureFirst: signatureInput
        $contractingCorpStaffSignatureSecond: signatureInput
        $contractingCorpStaffSignatureThird: signatureInput
        $ear: Boolean
        $earEarmuffs: Boolean
        $earEarplugs: Boolean
        $electric: Boolean
        $electricBreaker: Boolean
        $electricElectroscope: Boolean
        $electricShockPrevention: Boolean
        $eletricDisaster: Boolean
        $explode: Boolean
        $eye: Boolean
        $eyeMechanical: Boolean
        $eyeRadia: Boolean
        $fall: Boolean
        $fallAerialVehicle: Boolean
        $fallArrestor: Boolean
        $fallCage: Boolean
        $fallCover: Boolean
        $fallFence: Boolean
        $fallSafeLine: Boolean
        $fallSafeNet: Boolean
        $fallScaffold: Boolean
        $fallTravelLadder: Boolean
        $fallTrestleLadder: Boolean
        $fallWarningFence: Boolean
        $fire: Boolean
        $fireBackfire: Boolean
        $fireBlanket: Boolean
        $fireDisaster: Boolean
        $fireExtinguisher: Boolean
        $foot: Boolean
        $footChemical: Boolean
        $footNormal: Boolean
        $foreignEnterEye: Boolean
        $gasInclude: String
        $gasNone: Boolean
        $hand: Boolean
        $handCut: Boolean
        $handElectirc: Boolean
        $handGrand: Boolean
        $handHeat: Boolean
        $haneChemical: Boolean
        $head: Boolean
        $headElectric: Boolean
        $headPlastic: Boolean
        $headWorkspace: Boolean
        $heatTouch: Boolean
        $hypoxia: Boolean
        $meetingDatetime: DateTime
        $meetingPlace: String
        $microthermTouch: Boolean
        $minorContractCorpOne: String
        $minorContractCorpThree: String
        $minorContractCorpTwo: String
        $minorContractOneStaff: String
        $minorContractThreeStaff: String
        $minorContractTwoStaff: String
        $noise: Boolean
        $number: String!
        $objectFall: Boolean
        $ohterPrevention: String
        $otherDisaster: String
        $otherDisasterNone: Boolean
        $outdoorHeat: Boolean
        $oxygen: Boolean
        $oxygenGasDetection: Boolean
        $oxygenLifeDetection: Boolean
        $oxygenLifting: Boolean
        $oxygenRescue: Boolean
        $oxygenVentilation: Boolean
        $physicalFall: Boolean
        $primeContractCorp: String
        $primeContractStaff: String
        $primeAppearSignature: [signatureInput]
        $principleOnSiteBeforeWork: Boolean
        $principleOnSiteDuringWork: Boolean
        $principleOnSiteKnockOff: Boolean
        $principleOnSiteSupervisor: Boolean
        $project: String
        $publicityMatters: String
        $radiation: Boolean
        $restorationKnockOff: Boolean
        $restorationSupervisor: Boolean
        $safetyMeasureBeforeWork: Boolean
        $safetyMeasureDuringWork: Boolean
        $safetyMeasureKnockOff: Boolean
        $safetyMeasureSupervisor: Boolean
        $scrape: Boolean
        $siteId: String!
        $staffStateBeforeWork: Boolean
        $staffStateDuringWork: Boolean
        $staffStateKnockOff: Boolean
        $staffStateSupervisor: Boolean
        $system: String
        $systemBranch: String
        $systemEngineerSignature: signatureInput
        $username: String!
        $viceFirstAppearSignature: [signatureInput]
        $viceSecondAppearSignature: [signatureInput]
        $viceThirdAppearSignature: [signatureInput]
        $workContent: String
        $workPlace: String
    ) {
        updateToolboxMeeting(
            abnormal: $abnormal
            abnormalRecord: $abnormalRecord
            area: $area
            biologicalHazard: $biologicalHazard
            body: $body
            bodyBelt: $bodyBelt
            bodyClothing: $bodyClothing
            bodyMask: $bodyMask
            bodyVest: $bodyVest
            breathOxygen: $breathOxygen
            breathe: $breathe
            breathePapr: $breathePapr
            breatheScba: $breatheScba
            breatheDust: $breatheDust
            breatheFiltration: $breatheFiltration
            chemicalBurn: $chemicalBurn
            chemicalInclude: $chemicalInclude
            chemicalInhalation: $chemicalInhalation
            chemicalNone: $chemicalNone
            collapse: $collapse
            contentConformSupervisor: $contentConformSupervisor
            contentConformBeforeWork: $contentConformBeforeWork
            contentConformDuringWork: $contentConformDuringWork
            contractingCorpStaffSignatureFirst: $contractingCorpStaffSignatureFirst
            contractingCorpStaffSignatureSecond: $contractingCorpStaffSignatureSecond
            contractingCorpStaffSignatureThird: $contractingCorpStaffSignatureThird
            ear: $ear
            earEarmuffs: $earEarmuffs
            earEarplugs: $earEarplugs
            electric: $electric
            electricBreaker: $electricBreaker
            electricElectroscope: $electricElectroscope
            electricShockPrevention: $electricShockPrevention
            eletricDisaster: $eletricDisaster
            explode: $explode
            eye: $eye
            eyeMechanical: $eyeMechanical
            eyeRadia: $eyeRadia
            fall: $fall
            fallAerialVehicle: $fallAerialVehicle
            fallArrestor: $fallArrestor
            fallCage: $fallCage
            fallCover: $fallCover
            fallFence: $fallFence
            fallSafeLine: $fallSafeLine
            fallSafeNet: $fallSafeNet
            fallScaffold: $fallScaffold
            fallTravelLadder: $fallTravelLadder
            fallTrestleLadder: $fallTrestleLadder
            fallWarningFence: $fallWarningFence
            fire: $fire
            fireBackfire: $fireBackfire
            fireBlanket: $fireBlanket
            fireDisaster: $fireDisaster
            fireExtinguisher: $fireExtinguisher
            foot: $foot
            footChemical: $footChemical
            footNormal: $footNormal
            foreignEnterEye: $foreignEnterEye
            gasInclude: $gasInclude
            gasNone: $gasNone
            hand: $hand
            handCut: $handCut
            handElectirc: $handElectirc
            handGrand: $handGrand
            handHeat: $handHeat
            haneChemical: $haneChemical
            head: $head
            headElectric: $headElectric
            headPlastic: $headPlastic
            headWorkspace: $headWorkspace
            heatTouch: $heatTouch
            hypoxia: $hypoxia
            meetingDatetime: $meetingDatetime
            meetingPlace: $meetingPlace
            microthermTouch: $microthermTouch
            minorContractCorpOne: $minorContractCorpOne
            minorContractCorpThree: $minorContractCorpThree
            minorContractCorpTwo: $minorContractCorpTwo
            minorContractOneStaff: $minorContractOneStaff
            minorContractThreeStaff: $minorContractThreeStaff
            minorContractTwoStaff: $minorContractTwoStaff
            noise: $noise
            number: $number
            objectFall: $objectFall
            ohterPrevention: $ohterPrevention
            otherDisaster: $otherDisaster
            otherDisasterNone: $otherDisasterNone
            outdoorHeat: $outdoorHeat
            oxygen: $oxygen
            oxygenGasDetection: $oxygenGasDetection
            oxygenLifeDetection: $oxygenLifeDetection
            oxygenLifting: $oxygenLifting
            oxygenRescue: $oxygenRescue
            oxygenVentilation: $oxygenVentilation
            physicalFall: $physicalFall
            primeContractCorp: $primeContractCorp
            primeContractStaff: $primeContractStaff
            primeAppearSignature: $primeAppearSignature
            principleOnSiteBeforeWork: $principleOnSiteBeforeWork
            principleOnSiteDuringWork: $principleOnSiteDuringWork
            principleOnSiteKnockOff: $principleOnSiteKnockOff
            principleOnSiteSupervisor: $principleOnSiteSupervisor
            project: $project
            publicityMatters: $publicityMatters
            radiation: $radiation
            restorationKnockOff: $restorationKnockOff
            restorationSupervisor: $restorationSupervisor
            safetyMeasureBeforeWork: $safetyMeasureBeforeWork
            safetyMeasureDuringWork: $safetyMeasureDuringWork
            safetyMeasureKnockOff: $safetyMeasureKnockOff
            safetyMeasureSupervisor: $safetyMeasureSupervisor
            scrape: $scrape
            siteId: $siteId
            staffStateBeforeWork: $staffStateBeforeWork
            staffStateDuringWork: $staffStateDuringWork
            staffStateKnockOff: $staffStateKnockOff
            staffStateSupervisor: $staffStateSupervisor
            system: $system
            systemBranch: $systemBranch
            systemEngineerSignature: $systemEngineerSignature
            username: $username
            viceFirstAppearSignature: $viceFirstAppearSignature
            viceSecondAppearSignature: $viceSecondAppearSignature
            viceThirdAppearSignature: $viceThirdAppearSignature
            workContent: $workContent
            workPlace: $workPlace
        ) {
            ok
            message
        }
    }
`;