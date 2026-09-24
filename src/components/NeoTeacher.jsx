import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { ThinkingOrb } from 'thinking-orbs';
import FunctionIntroScene from './FunctionIntroScene';
import BusinessEnvironmentsScene from './BusinessEnvironmentsScene';
import PestleScene from './PestleScene';
import {
  DefensiveStrategiesScene,
  IntensiveStrategiesScene,
  DiversificationScene,
  StrategyEvaluationScene,
  PorterFiveForcesScene,
  BusinessSectorsScene,
  SwotGridScene,
  BceaClockScene,
  LraBalanceScene,
  NcaContractScene,
  CpaShieldScene,
  EeaBalanceScene,
  BbbeePillarsScene,
  SdaTreeScene,
  StrategicJourneyScene,
  StrategyDashboardScene,
  RecruitmentSplitScene,
  SelectionFunnelScene,
  EmploymentContractScene,
  InductionMapScene,
  TerminationDoorsScene,
  SalaryScaleScene,
  FringeBenefitsScene,
  JobAnalysisScene,
  InterviewTableScene,
  UifNetScene,
  QcVsQaScene,
  TqmWheelScene,
  TqmCostScene,
  TqmPoorScene,
  QualityCirclesScene,
  PdcaCycleScene,
  QualityFinancialScene,
  QualityPurchasingScene,
  QualityProductionScene,
  QualityMarketingScene,
  QualityAdministrationScene,
  QualityGeneralManagementScene,
  QualityPublicRelationsScene,
  QualitySystemBenefitsScene,
  MgmtVsLeadershipScene,
  LeadershipTheoriesScene,
  LeadershipStylesScene,
  PersonalAttitudeScene,
  CompanyCriteriaScene,
  InvestmentFactorsScene,
  SimpleVsCompoundScene,
  JseMarketScene,
  RsaBondsScene,
  UnitTrustsScene,
  VentureCapitalScene,
  InsuranceVsAssuranceScene,
  CompulsoryInsuranceScene,
  InsurancePrinciplesScene,
  AverageClauseScene,
  InsurableRisksScene,
  ExcessScene,
  SoleTraderScene,
  PartnershipScene,
  PrivateCompanyScene,
  PublicCompanyScene,
  PersonalLiabilityCompanyScene,
  StateOwnedCompanyScene,
  NonProfitCompanyScene,
  CooperativeScene,
  DesigningPresentationScene,
  PresentingScene,
  VisualAidsScene,
  ProblemSolvingStepsScene,
  ProblemSolvingTechniquesScene,
  CreativeThinkingScene,
  ConflictManagementScene,
  GrievanceProcedureScene,
  TeamStagesScene,
  TeamDynamicsScene,
  TeamPerformanceScene,
  HumanRightsScene,
  DiversityScene,
  CsrScene,
  CsiScene,
  TripleBottomLineScene,
  SocioEconomicScene,
  KingCodeScene,
  ProfessionalEthicsScene,
  HealthSafetyScene,
  EnvironmentalProtectionScene,
} from './BusinessScenes';
import {
  SynopticMapScene,
  MidLatitudeCycloneScene,
  TropicalCycloneScene,
  AnticyclonesScene,
  ValleyClimateScene,
  UrbanClimateScene,
  InversionLayerScene,
  BergWindScene,
  DrainageBasinsScene,
  RiverCaptureScene,
  FluvialLandformsScene,
  RiverRejuvenationScene,
  CatchmentManagementScene,
  RuralSettlementsScene,
  UrbanHierarchyScene,
  UrbanProfileScene,
  RuralUrbanMigrationScene,
  InformalSettlementsScene,
  EconomicSectorsScene,
  AgricultureScene,
  MiningScene,
  CoreIndustrialRegionsScene,
  InformalSectorScene,
  MapScaleDistanceScene,
  CrossSectionsGradientScene,
  ContoursLandformsScene,
  GisLayersScene,
  MapInterpretationScene,
} from './GeographyScenes';
import {
  CircularFlowScene,
  MultiplierScene,
  FactorsOfProductionScene,
  BusinessCycleScene,
  NationalAccountsScene,
  PublicSectorScene,
  GrowthTimelineScene,
  InternationalTradeScene,
  TaxationScene,
  PerfectMarketScene,
  ImperfectMarketsScene,
  MarketFailureScene,
  InflationScene,
  EnvironmentScene,
  TourismScene,
} from './EconomicsScenes';
import {
  FinanceDocumentsScene,
  FinanceBudgetsScene,
  FinanceBreakEvenScene,
  FinanceTaxScene,
  FinanceVatScene,
  FinanceExchangeScene,
  FinanceInterestScene,
  FinanceCostComparisonScene,
  DataTypesScene,
  DataCentralTendencyScene,
  DataSpreadScene,
  DataGraphsScene,
  DataInterpretScene,
  ProbBasicsScene,
  ProbRulesScene,
  ProbDiagramsScene,
  MeasureConversionsScene,
  MeasurePerimeterAreaScene,
  MeasureSurfaceVolumeScene,
  MeasureRateTimeScene,
  MeasurePracticalScene,
  MeasurePlansCostScene,
  MapsScaleScene,
  MapsDirectionScene,
  MapsRouteInfoScene,
  PlansFloorScene,
  PlansPackScene,
} from './MathsLitScenes';
import {
  FinStatementComprehensiveIncomeScene,
  FinStatementPositionScene,
  FinStatementNotesScene,
  FinFixedAssetsDepreciationScene,
  FinClosingStockScene,
  CfOperatingActivitiesScene,
  CfInvestingFinancingScene,
  CfReconciliationNoteScene,
  FiEpsDpsScene,
  FiNavPerShareScene,
  FiReturnEquityScene,
  FiDividendPayoutScene,
  FiOperatingExpensesRatioScene,
  FiStockTurnoverScene,
  FiAcidTestScene,
  InterpProfitabilityScene,
  InterpLiquidityScene,
  InterpGearingScene,
  InterpDividendsEarningsScene,
  InterpShareholdingScene,
  InterpSharePriceScene,
  GovAuditInternalExternalScene,
  GovWhistleBlowingScene,
  GovShareholderConcernsScene,
  GovCeoCfoRolesScene,
  RecBankReconScene,
  RecCreditorsReconScene,
  RecDebtorsReconScene,
  RecDebtorsAgeScene,
  RecVatScene,
  CostDirectMaterialScene,
  CostDirectLabourScene,
  CostOverheadsScene,
  CostProductionStatementScene,
  CostBreakEvenScene,
  CostUnitCostsScene,
  CostWastageScene,
  BudgetCashBudgetScene,
  BudgetDebtorsCollectionScene,
  BudgetCreditorsPaymentScene,
  BudgetComprehensiveIncomeScene,
  BudgetVarianceAnalysisScene,
  StockValuationMethodsScene,
  StockHoldingPeriodScene,
  StockWastageLossScene,
  FixedAssetsAcquisitionDisposalScene,
  FixedAssetsDepreciationScene,
} from './AccountingScenes';
import {
  NewtonsLawsScene,
  FrictionScene,
  ProjectileMotionScene,
  MomentumScene,
  WorkEnergyScene,
  DopplerEffectScene,
  ElectrostaticsScene,
  ElectricCircuitsScene,
  ElectrodynamicsScene,
  PhotoelectricEffectScene,
  OrganicNamingScene,
  IntermolecularForcesScene,
  OrganicReactionsScene,
  ReactionRatesScene,
  EquilibriumScene,
  AcidsBasesScene,
  RedoxGalvanicScene,
  ElectrolyticScene,
} from './PhysicsScenes';
import {
  EyePupillaryScene,
  EyeAccommodationDefectsScene,
  EarHearingBalanceScene,
  NsNeuronsScene,
  NsReflexArcScene,
  NsBrainScene,
  EndoSaltWaterScene,
  EndoGlucoseThyroxinScene,
  ThermoSkinScene,
  ReproMaleScene,
  ReproFemaleScene,
  ReproEmbryonicScene,
  ReproPlantScene,
  ReproStrategiesScene,
  DnaStructureReplicationScene,
  ProteinSynthesisScene,
  MutationScene,
  MeiosisPhasesCrossingOverScene,
  MeiosisNonDisjunctionScene,
  GenMonohybridDihybridScene,
  GenBloodGroupsScene,
  GenSexLinkedScene,
  GenPedigreesIncompleteScene,
  EvoNaturalSelectionSpeciationScene,
  EvoArtificialSelectionScene,
  EvoFossilsBiogeographyScene,
  EvoGeneticOutOfAfricaScene,
  HominidBipedalismBrainToolsScene,
} from './LifeSciencesScenes';
import {
  ColdWarOriginsScene,
  BerlinWallScene,
  ColdWarVietnamScene,
  IndependentAfricaAngolaScene,
  IndependentAfricaCongoScene,
  CivilRightsFreedomRidesScene,
  BlackPowerMovementScene,
  ContainmentMarshallScene,
  BerlinBlockade1948Scene,
  CuitoCuanavaleScene,
  CivilRightsSitInsScene,
  CivilRightsSelmaScene,
  MarchOnWashingtonScene,
  MlkNonViolenceScene,
  P2BcNatureAimsScene,
  P2BcmOrganisationsScene,
  P2Soweto1976Scene,
  P2BlackLocalAuthoritiesScene,
  P2TradeUnionMovementScene,
  P2InternalResistance1980sScene,
  P2RentBoycottsScene,
  P2NegotiationsScene,
  P2CodesaScene,
  P2ViolenceDerailScene,
  P2RoadTo1994Scene,
  P2TrcEstablishmentScene,
  P2TrcJusticeScene,
  P2TrcAmnestyScene,
  P2TrcCaseStudiesScene,
  P2GorbachevReformsScene,
  P2EasternEuropeScene,
  P2UssrDisintegrationScene,
  P2GlobalisationScene,
  P2BalanceOfPowerAfricaScene,
  P2BricsScene,
  P2ResponsesGlobalisationScene,
} from './HistoryScenes';
import {
  ComprehensionSkillsScene,
  VisualLiteracyScene,
  SummaryWritingScene,
  AdvertisementAnalysisScene,
  CartoonAnalysisScene,
  GrammarPunctuationScene,
  VocabularyAndContextScene,
  CryPlotScene,
  CryCharactersScene,
  CrySettingScene,
  CryEssayScene,
  JekyllPlotScene,
  JekyllCharactersScene,
  JekyllEssayScene,
  MacbethPlotScene,
  MacbethCharactersScene,
  MacbethEssayScene,
  McmaPlotScene,
  McmaCharactersScene,
  McmaEssayScene,
} from './EnglishScenes';
import {
  AlgFactorisingQuadraticsScene,
  AlgQuadraticFormulaScene,
  AlgQuadraticInequalitiesScene,
  AlgSurdsScene,
  AlgSimultaneousEquationsScene,
  AlgExponentialEquationsScene,
  SeqGeometricSeriesScene,
  SeqSigmaNotationScene,
  SeqQuadraticPatternsScene,
  SeqArithmeticSeriesScene,
  SeqMixedGeometricArithmeticScene,
  FuncHyperbolaScene,
  FuncParabolaExponentialScene,
  FuncInversesScene,
  FuncExponentialLogScene,
  FuncTransformationsScene,
  FinCompoundInterestScene,
  FinAnnuitiesFutureValueScene,
  FinLoansPresentValueScene,
  FinDepreciationScene,
  CalcFirstPrinciplesScene,
  CalcDifferentiationRulesScene,
  CalcTangentsScene,
  CalcCubicGraphsScene,
  CalcTurningPointsConcavityScene,
  CalcOptimisationScene,
  CalcRatesOfChangeScene,
  ProbVennDiagramsScene,
  ProbTreeDiagramsScene,
  ProbCountingPrinciplesScene,
  ProbIndependentMutuallyExclusiveScene,
  StatsScatterPlotsScene,
  StatsLeastSquaresScene,
  StatsCorrelationScene,
  StatsStandardDeviationScene,
  StatsOgivesHistogramsScene,
  AnageoDistanceGradientMidpointScene,
  AnageoLineEquationsScene,
  AnageoCirclesScene,
  AnageoTangentsScene,
  AnageoOptimisationScene,
  TrigReductionFormulaeScene,
  TrigCompoundDoubleAngleScene,
  TrigGeneralSolutionsScene,
  TrigIdentitiesProofScene,
  Trig2D3DProblemsScene,
  TrigGraphsTanSinCosScene,
  TrigGraphTransformationsScene,
  TrigInequalitiesScene,
  EucCyclicQuadScene,
  EucCentreChordScene,
  EucTangentsScene,
  EucCyclicQuadProofsScene,
  EucSimilarityScene,
  EucProportionalityScene,
  EucProportionalityProofsScene,
} from './MathsScenes';
import '../css/NeoTeacher.css';

const SCENE_REGISTRY = {
  'function-intro': FunctionIntroScene,

  // Business Studies — P1
  'pestle-intro': PestleScene,
  'business-environments': BusinessEnvironmentsScene,
  'business-sectors': BusinessSectorsScene,
  'swot-grid': SwotGridScene,
  'bcea-clock': BceaClockScene,
  'lra-balance': LraBalanceScene,
  'nca-contract': NcaContractScene,
  'cpa-shield': CpaShieldScene,
  'eea-balance': EeaBalanceScene,
  'bbbee-pillars': BbbeePillarsScene,
  'sda-setas': SdaTreeScene,
  'strategic-journey': StrategicJourneyScene,
  'strategy-evaluation': StrategyEvaluationScene,
  'strategy-dashboard': StrategyDashboardScene,
  'intensive-strategies': IntensiveStrategiesScene,
  'defensive-strategies': DefensiveStrategiesScene,
  'diversification': DiversificationScene,
  'integration-strategies': DiversificationScene,
  'porter-five-forces': PorterFiveForcesScene,
  'recruitment-split': RecruitmentSplitScene,
  'selection-funnel': SelectionFunnelScene,
  'employment-contract': EmploymentContractScene,
  'induction-map': InductionMapScene,
  'termination-doors': TerminationDoorsScene,
  'salary-scale': SalaryScaleScene,
  'fringe-benefits': FringeBenefitsScene,
  'job-analysis': JobAnalysisScene,
  'interview-table': InterviewTableScene,
  'uif-net': UifNetScene,
  'qc-vs-qa': QcVsQaScene,
  'tqm-wheel': TqmWheelScene,
  'tqm-cost': TqmCostScene,
  'tqm-poor': TqmPoorScene,
  'quality-circles': QualityCirclesScene,
  'pdca-cycle': PdcaCycleScene,
  'quality-financial': QualityFinancialScene,
  'quality-purchasing': QualityPurchasingScene,
  'quality-production': QualityProductionScene,
  'quality-marketing': QualityMarketingScene,
  'quality-administration': QualityAdministrationScene,
  'quality-general-management': QualityGeneralManagementScene,
  'quality-public-relations': QualityPublicRelationsScene,
  'quality-system-benefits': QualitySystemBenefitsScene,

  // Business Studies — P2
  'mgmt-vs-leadership': MgmtVsLeadershipScene,
  'leadership-theories': LeadershipTheoriesScene,
  'leadership-styles': LeadershipStylesScene,
  'personal-attitude': PersonalAttitudeScene,
  'company-criteria': CompanyCriteriaScene,
  'investment-factors': InvestmentFactorsScene,
  'simple-vs-compound': SimpleVsCompoundScene,
  'jse-market': JseMarketScene,
  'rsa-bonds': RsaBondsScene,
  'unit-trusts': UnitTrustsScene,
  'venture-capital': VentureCapitalScene,
  'insurance-vs-assurance': InsuranceVsAssuranceScene,
  'compulsory-insurance': CompulsoryInsuranceScene,
  'insurance-principles': InsurancePrinciplesScene,
  'average-clause': AverageClauseScene,
  'insurable-risks': InsurableRisksScene,
  'excess': ExcessScene,
  'sole-trader': SoleTraderScene,
  'partnership': PartnershipScene,
  'private-company': PrivateCompanyScene,
  'public-company': PublicCompanyScene,
  'personal-liability-company': PersonalLiabilityCompanyScene,
  'state-owned-company': StateOwnedCompanyScene,
  'non-profit-company': NonProfitCompanyScene,
  'cooperative': CooperativeScene,
  'designing-presentation': DesigningPresentationScene,
  'presenting': PresentingScene,
  'visual-aids': VisualAidsScene,
  'problem-solving-steps': ProblemSolvingStepsScene,
  'problem-solving-techniques': ProblemSolvingTechniquesScene,
  'creative-thinking': CreativeThinkingScene,
  'conflict-management': ConflictManagementScene,
  'grievance-procedure': GrievanceProcedureScene,
  'team-stages': TeamStagesScene,
  'team-dynamics': TeamDynamicsScene,
  'team-performance': TeamPerformanceScene,
  'human-rights': HumanRightsScene,
  'diversity': DiversityScene,
  'csr': CsrScene,
  'csi': CsiScene,
  'triple-bottom-line': TripleBottomLineScene,
  'socio-economic': SocioEconomicScene,
  'king-code': KingCodeScene,
  'professional-ethics': ProfessionalEthicsScene,
  'health-safety': HealthSafetyScene,
  'environmental-protection': EnvironmentalProtectionScene,

  // Geography — P1
  'synoptic-map': SynopticMapScene,
  'mid-latitude-cyclone': MidLatitudeCycloneScene,
  'tropical-cyclone': TropicalCycloneScene,
  'anticyclones': AnticyclonesScene,
  'valley-climate': ValleyClimateScene,
  'urban-climate': UrbanClimateScene,
  'inversion-layer': InversionLayerScene,
  'berg-wind': BergWindScene,
  'drainage-basins': DrainageBasinsScene,
  'river-capture': RiverCaptureScene,
  'fluvial-landforms': FluvialLandformsScene,
  'river-rejuvenation': RiverRejuvenationScene,
  'catchment-management': CatchmentManagementScene,
  'rural-settlements': RuralSettlementsScene,
  'urban-hierarchy': UrbanHierarchyScene,
  'urban-profile': UrbanProfileScene,
  'rural-urban-migration': RuralUrbanMigrationScene,
  'informal-settlements': InformalSettlementsScene,
  'economic-sectors': EconomicSectorsScene,
  'agriculture': AgricultureScene,
  'mining': MiningScene,
  'core-industrial-regions': CoreIndustrialRegionsScene,
  'informal-sector': InformalSectorScene,
  'map-scale-distance': MapScaleDistanceScene,
  'cross-sections-gradient': CrossSectionsGradientScene,
  'contours-landforms': ContoursLandformsScene,
  'gis-layers': GisLayersScene,
  'map-interpretation': MapInterpretationScene,

  // Economics
  'circular-flow': CircularFlowScene,
  'multiplier': MultiplierScene,
  'factors-of-production': FactorsOfProductionScene,
  'business-cycle': BusinessCycleScene,
  'national-accounts': NationalAccountsScene,
  'public-sector': PublicSectorScene,
  'growth-timeline': GrowthTimelineScene,
  'international-trade': InternationalTradeScene,
  'taxation': TaxationScene,
  'perfect-market': PerfectMarketScene,
  'imperfect-markets': ImperfectMarketsScene,
  'market-failure': MarketFailureScene,
  'inflation': InflationScene,
  'environment': EnvironmentScene,
  'tourism': TourismScene,

  // Maths Lit
  'finance-documents': FinanceDocumentsScene,
  'finance-budgets': FinanceBudgetsScene,
  'finance-break-even': FinanceBreakEvenScene,
  'finance-tax': FinanceTaxScene,
  'finance-vat': FinanceVatScene,
  'finance-exchange': FinanceExchangeScene,
  'finance-interest': FinanceInterestScene,
  'finance-cost-comparison': FinanceCostComparisonScene,
  'data-types': DataTypesScene,
  'data-central-tendency': DataCentralTendencyScene,
  'data-spread': DataSpreadScene,
  'data-graphs': DataGraphsScene,
  'data-interpret': DataInterpretScene,
  'prob-basics': ProbBasicsScene,
  'prob-rules': ProbRulesScene,
  'prob-diagrams': ProbDiagramsScene,
  'measure-conversions': MeasureConversionsScene,
  'measure-perimeter-area': MeasurePerimeterAreaScene,
  'measure-surface-volume': MeasureSurfaceVolumeScene,
  'measure-rate-time': MeasureRateTimeScene,
  'measure-practical': MeasurePracticalScene,
  'measure-plans-cost': MeasurePlansCostScene,
  'maps-scale': MapsScaleScene,
  'maps-direction': MapsDirectionScene,
  'maps-route-info': MapsRouteInfoScene,
  'plans-floor': PlansFloorScene,
  'plans-pack': PlansPackScene,

  // Accounting — P1
  'fin-statement-comprehensive-income': FinStatementComprehensiveIncomeScene,
  'fin-statement-position': FinStatementPositionScene,
  'fin-statement-notes': FinStatementNotesScene,
  'fin-fixed-assets-depreciation': FinFixedAssetsDepreciationScene,
  'fin-closing-stock': FinClosingStockScene,
  'cf-operating-activities': CfOperatingActivitiesScene,
  'cf-investing-financing': CfInvestingFinancingScene,
  'cf-reconciliation-note': CfReconciliationNoteScene,
  'fi-eps-dps': FiEpsDpsScene,
  'fi-nav-per-share': FiNavPerShareScene,
  'fi-return-equity': FiReturnEquityScene,
  'fi-dividend-payout': FiDividendPayoutScene,
  'fi-operating-expenses-ratio': FiOperatingExpensesRatioScene,
  'fi-stock-turnover': FiStockTurnoverScene,
  'fi-acid-test': FiAcidTestScene,
  'interp-profitability': InterpProfitabilityScene,
  'interp-liquidity': InterpLiquidityScene,
  'interp-gearing': InterpGearingScene,
  'interp-dividends-earnings': InterpDividendsEarningsScene,
  'interp-shareholding': InterpShareholdingScene,
  'interp-share-price': InterpSharePriceScene,
  'gov-audit-internal-external': GovAuditInternalExternalScene,
  'gov-whistle-blowing': GovWhistleBlowingScene,
  'gov-shareholder-concerns': GovShareholderConcernsScene,
  'gov-ceo-cfo-roles': GovCeoCfoRolesScene,
  'rec-bank-recon': RecBankReconScene,
  'rec-creditors-recon': RecCreditorsReconScene,
  'rec-debtors-recon': RecDebtorsReconScene,
  'rec-debtors-age': RecDebtorsAgeScene,
  'rec-vat': RecVatScene,
  'cost-direct-material': CostDirectMaterialScene,
  'cost-direct-labour': CostDirectLabourScene,
  'cost-overheads': CostOverheadsScene,
  'cost-production-statement': CostProductionStatementScene,
  'cost-break-even': CostBreakEvenScene,
  'cost-unit-costs': CostUnitCostsScene,
  'cost-wastage': CostWastageScene,
  'budget-cash-budget': BudgetCashBudgetScene,
  'budget-debtors-collection': BudgetDebtorsCollectionScene,
  'budget-creditors-payment': BudgetCreditorsPaymentScene,
  'budget-comprehensive-income': BudgetComprehensiveIncomeScene,
  'budget-variance-analysis': BudgetVarianceAnalysisScene,
  'stock-valuation-methods': StockValuationMethodsScene,
  'stock-holding-period': StockHoldingPeriodScene,
  'stock-wastage-loss': StockWastageLossScene,
  'fixed-assets-acquisition-disposal': FixedAssetsAcquisitionDisposalScene,
  'fixed-assets-depreciation': FixedAssetsDepreciationScene,

  // Physical Sciences — P1
  'newtons-laws': NewtonsLawsScene,
  'friction': FrictionScene,
  'projectile-motion': ProjectileMotionScene,
  'momentum': MomentumScene,
  'work-energy': WorkEnergyScene,
  'doppler-effect': DopplerEffectScene,
  'electrostatics': ElectrostaticsScene,
  'electric-circuits': ElectricCircuitsScene,
  'electrodynamics': ElectrodynamicsScene,
  'photoelectric-effect': PhotoelectricEffectScene,
  // Physical Sciences — P2
  'organic-naming': OrganicNamingScene,
  'intermolecular-forces': IntermolecularForcesScene,
  'organic-reactions': OrganicReactionsScene,
  'reaction-rates': ReactionRatesScene,
  'equilibrium': EquilibriumScene,
  'acids-bases': AcidsBasesScene,
  'redox-galvanic': RedoxGalvanicScene,
  'electrolytic': ElectrolyticScene,

  // Life Sciences — P1
  'eye-pupillary': EyePupillaryScene,
  'eye-accommodation-defects': EyeAccommodationDefectsScene,
  'ear-hearing-balance': EarHearingBalanceScene,
  'ns-neurons': NsNeuronsScene,
  'ns-reflex-arc': NsReflexArcScene,
  'ns-brain': NsBrainScene,
  'endo-salt-water': EndoSaltWaterScene,
  'endo-glucose-thyroxin': EndoGlucoseThyroxinScene,
  'thermo-skin': ThermoSkinScene,
  'repro-male': ReproMaleScene,
  'repro-female': ReproFemaleScene,
  'repro-embryonic': ReproEmbryonicScene,
  'repro-plant': ReproPlantScene,
  'repro-strategies': ReproStrategiesScene,
  // Life Sciences — P2
  'dna-structure-replication': DnaStructureReplicationScene,
  'protein-synthesis': ProteinSynthesisScene,
  'mutation': MutationScene,
  'meiosis-phases-crossing-over': MeiosisPhasesCrossingOverScene,
  'meiosis-non-disjunction': MeiosisNonDisjunctionScene,
  'gen-monohybrid-dihybrid': GenMonohybridDihybridScene,
  'gen-blood-groups': GenBloodGroupsScene,
  'gen-sex-linked': GenSexLinkedScene,
  'gen-pedigrees-incomplete': GenPedigreesIncompleteScene,
  'evo-natural-selection-speciation': EvoNaturalSelectionSpeciationScene,
  'evo-artificial-selection': EvoArtificialSelectionScene,
  'evo-fossils-biogeography': EvoFossilsBiogeographyScene,
  'evo-genetic-out-of-africa': EvoGeneticOutOfAfricaScene,
  'hominid-bipedalism-brain-tools': HominidBipedalismBrainToolsScene,

  // History — P1
  'cold-war-origins': ColdWarOriginsScene,
  'berlin-wall': BerlinWallScene,
  'cold-war-vietnam': ColdWarVietnamScene,
  'independent-africa-angola': IndependentAfricaAngolaScene,
  'independent-africa-congo': IndependentAfricaCongoScene,
  'civil-rights-freedom-rides': CivilRightsFreedomRidesScene,
  'black-power-movement': BlackPowerMovementScene,
  'containment-marshall': ContainmentMarshallScene,
  'berlin-blockade-1948': BerlinBlockade1948Scene,
  'cuito-cuanavale': CuitoCuanavaleScene,
  'civil-rights-sit-ins': CivilRightsSitInsScene,
  'civil-rights-selma': CivilRightsSelmaScene,
  'march-on-washington': MarchOnWashingtonScene,
  'mlk-non-violence': MlkNonViolenceScene,
  // History — P2
  'p2-bc-nature-aims': P2BcNatureAimsScene,
  'p2-bcm-organisations': P2BcmOrganisationsScene,
  'p2-soweto-1976': P2Soweto1976Scene,
  'p2-black-local-authorities': P2BlackLocalAuthoritiesScene,
  'p2-trade-union-movement': P2TradeUnionMovementScene,
  'p2-internal-resistance-1980s': P2InternalResistance1980sScene,
  'p2-rent-boycotts': P2RentBoycottsScene,
  'p2-negotiations-1989-1991': P2NegotiationsScene,
  'p2-codesa': P2CodesaScene,
  'p2-violence-derail': P2ViolenceDerailScene,
  'p2-road-to-1994': P2RoadTo1994Scene,
  'p2-trc-establishment': P2TrcEstablishmentScene,
  'p2-trc-justice': P2TrcJusticeScene,
  'p2-trc-amnesty': P2TrcAmnestyScene,
  'p2-trc-case-studies': P2TrcCaseStudiesScene,
  'p2-gorbachev-reforms': P2GorbachevReformsScene,
  'p2-eastern-europe': P2EasternEuropeScene,
  'p2-ussr-disintegration': P2UssrDisintegrationScene,
  'p2-globalisation': P2GlobalisationScene,
  'p2-balance-of-power-africa': P2BalanceOfPowerAfricaScene,
  'p2-brics': P2BricsScene,
  'p2-responses-globalisation': P2ResponsesGlobalisationScene,

  // English FAL — P1
  'comprehension-skills': ComprehensionSkillsScene,
  'visual-literacy': VisualLiteracyScene,
  'summary-writing': SummaryWritingScene,
  'advertisement-analysis': AdvertisementAnalysisScene,
  'cartoon-analysis': CartoonAnalysisScene,
  'grammar-and-punctuation': GrammarPunctuationScene,
  'vocabulary-and-context': VocabularyAndContextScene,
  // English FAL — P2
  'cry-plot': CryPlotScene,
  'cry-characters': CryCharactersScene,
  'cry-setting': CrySettingScene,
  'cry-essay': CryEssayScene,
  'jekyll-plot': JekyllPlotScene,
  'jekyll-characters': JekyllCharactersScene,
  'jekyll-essay': JekyllEssayScene,
  'macbeth-plot': MacbethPlotScene,
  'macbeth-characters': MacbethCharactersScene,
  'macbeth-essay': MacbethEssayScene,
  'mcma-plot': McmaPlotScene,
  'mcma-characters': McmaCharactersScene,
  'mcma-essay': McmaEssayScene,

  // ─── Mathematics — P1 Algebra (6 scenes) ───
  'alg-factorising-quadratics': AlgFactorisingQuadraticsScene,
  'alg-quadratic-formula': AlgQuadraticFormulaScene,
  'alg-quadratic-inequalities': AlgQuadraticInequalitiesScene,
  'alg-surds': AlgSurdsScene,
  'alg-simultaneous-equations': AlgSimultaneousEquationsScene,
  'alg-exponential-equations': AlgExponentialEquationsScene,

  // ─── Mathematics — P1 Sequences (5 scenes) ───
  'seq-geometric-series': SeqGeometricSeriesScene,
  'seq-sigma-notation': SeqSigmaNotationScene,
  'seq-quadratic-patterns': SeqQuadraticPatternsScene,
  'seq-arithmetic-series': SeqArithmeticSeriesScene,
  'seq-mixed-geometric-arithmetic': SeqMixedGeometricArithmeticScene,

  // ─── Mathematics — P1 Functions (5 scenes) ───
  'func-hyperbola': FuncHyperbolaScene,
  'func-parabola-exponential': FuncParabolaExponentialScene,
  'func-inverses': FuncInversesScene,
  'func-exponential-log': FuncExponentialLogScene,
  'func-transformations': FuncTransformationsScene,

  // ─── Mathematics — P1 Finance (4 scenes) ───
  'fin-compound-interest': FinCompoundInterestScene,
  'fin-annuities-future-value': FinAnnuitiesFutureValueScene,
  'fin-loans-present-value': FinLoansPresentValueScene,
  'fin-depreciation': FinDepreciationScene,

  // ─── Mathematics — P1 Calculus Rules (3 scenes) ───
  'calc-first-principles': CalcFirstPrinciplesScene,
  'calc-differentiation-rules': CalcDifferentiationRulesScene,
  'calc-tangents': CalcTangentsScene,

  // ─── Mathematics — P1 Calculus Cubics (4 scenes) ───
  'calc-cubic-graphs': CalcCubicGraphsScene,
  'calc-turning-points-concavity': CalcTurningPointsConcavityScene,
  'calc-optimisation': CalcOptimisationScene,
  'calc-rates-of-change': CalcRatesOfChangeScene,

  // ─── Mathematics — P1 Probability (4 scenes) ───
  'prob-venn-diagrams': ProbVennDiagramsScene,
  'prob-tree-diagrams': ProbTreeDiagramsScene,
  'prob-counting-principles': ProbCountingPrinciplesScene,
  'prob-independent-mutually-exclusive': ProbIndependentMutuallyExclusiveScene,

  // ─── Mathematics — P2 Statistics (5 scenes) ───
  'stats-scatter-plots': StatsScatterPlotsScene,
  'stats-least-squares': StatsLeastSquaresScene,
  'stats-correlation': StatsCorrelationScene,
  'stats-standard-deviation': StatsStandardDeviationScene,
  'stats-ogives-histograms': StatsOgivesHistogramsScene,

  // ─── Mathematics — P2 Analytical Geometry (5 scenes) ───
  'anageo-distance-gradient-midpoint': AnageoDistanceGradientMidpointScene,
  'anageo-line-equations': AnageoLineEquationsScene,
  'anageo-circles': AnageoCirclesScene,
  'anageo-tangents': AnageoTangentsScene,
  'anageo-optimisation': AnageoOptimisationScene,

  // ─── Mathematics — P2 Trig Identities (5 scenes) ───
  'trig-reduction-formulae': TrigReductionFormulaeScene,
  'trig-compound-double-angle': TrigCompoundDoubleAngleScene,
  'trig-general-solutions': TrigGeneralSolutionsScene,
  'trig-identities-proof': TrigIdentitiesProofScene,
  'trig-2d-3d-problems': Trig2D3DProblemsScene,

  // ─── Mathematics — P2 Trig Graphs (3 scenes) ───
  'trig-graphs-tan-sin-cos': TrigGraphsTanSinCosScene,
  'trig-graph-transformations': TrigGraphTransformationsScene,
  'trig-inequalities': TrigInequalitiesScene,

  // ─── Mathematics — P2 Euclidean Circles (4 scenes) ───
  'euc-cyclic-quad': EucCyclicQuadScene,
  'euc-centre-chord': EucCentreChordScene,
  'euc-tangents': EucTangentsScene,
  'euc-cyclic-quad-proofs': EucCyclicQuadProofsScene,

  // ─── Mathematics — P2 Euclidean Similarity (3 scenes) ───
  'euc-similarity': EucSimilarityScene,
  'euc-proportionality': EucProportionalityScene,
  'euc-proportionality-proofs': EucProportionalityProofsScene,
};

const NeoTeacher = ({ content, avatarSrc, onComplete, onSpeak }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [spokenSections, setSpokenSections] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [revealedWords, setRevealedWords] = useState({});
  const [sceneSteps, setSceneSteps] = useState({});
  const [orbState, setOrbState] = useState('breathing');

  const sectionRefs = useRef([]);
  const isMountedRef = useRef(true);

  const revealWordsOver = (sectionIndex, text, durationMs) => {
    if (!text) return;
    const words = text.split(/\s+/);
    const perWord = durationMs / words.length;
    words.forEach((_, i) => {
      setTimeout(() => {
        if (!isMountedRef.current) return;
        setRevealedWords((prev) => ({ ...prev, [sectionIndex]: i + 1 }));
      }, perWord * i);
    });
  };

  const playSection = async (index) => {
    if (!isMountedRef.current) return;
    if (!content || !content.sections || index >= content.sections.length) {
      setShowContinue(true);
      setIsPlaying(false);
      setOrbState('breathing');
      return;
    }
    setCurrentSection(index);
    setIsPlaying(true);
    const section = content.sections[index];

    if (section.type === 'heading') setOrbState('listening');
    else if (section.type === 'concept') setOrbState('working');
    else if (section.type === 'bullets') setOrbState('weaving');
    else if (section.type === 'scene') setOrbState('composing');
    else if (section.type === 'example') setOrbState('working');
    else setOrbState('breathing');

    if (section.type === 'scene') {
      const stepDuration = section.stepDuration || 3200;
      const maxStep = section.steps ?? 4;
      let captionMs = 0;
      if (onSpeak && section.caption) captionMs = await onSpeak(section.caption);
      await new Promise((res) => setTimeout(res, (captionMs || 0) + 400));
      if (!isMountedRef.current) return;
      for (let s = 0; s <= maxStep; s++) {
        if (!isMountedRef.current) return;
        setSceneSteps((prev) => ({ ...prev, [index]: s }));
        const stepText = section.stepTexts?.[s];
        if (stepText && onSpeak) {
          const stepMs = await onSpeak(stepText);
          await new Promise((res) => setTimeout(res, (stepMs || 0) + 200));
        } else {
          await new Promise((res) => setTimeout(res, stepDuration));
        }
      }
      if (!isMountedRef.current) return;
      setSpokenSections((prev) => [...prev, index]);
      playSection(index + 1);
      return;
    }

    if (section.type === 'example') {
      const parts = [section.scenario, ...(section.steps || []), section.answer ? `So the answer is: ${section.answer}` : null].filter(Boolean);
      const textToSpeak = parts.join('. ');
      let audioMs = 0;
      if (onSpeak && textToSpeak) audioMs = await onSpeak(textToSpeak);
      const fallbackMs = textToSpeak ? (textToSpeak.trim().split(/\s+/).length / 150) * 60 * 1000 : 800;
      const durationMs = audioMs > 0 ? audioMs : fallbackMs;
      if (section.sceneId && SCENE_REGISTRY[section.sceneId]) {
        const stepCount = section.steps?.length || 1;
        const perStep = durationMs / stepCount;
        for (let s = 0; s <= stepCount; s++) {
          setTimeout(() => {
            if (!isMountedRef.current) return;
            setSceneSteps((prev) => ({ ...prev, [index]: s }));
          }, perStep * s);
        }
      }
      setTimeout(() => {
        if (!isMountedRef.current) return;
        setSpokenSections((prev) => [...prev, index]);
        playSection(index + 1);
      }, durationMs + 300);
      return;
    }

    let textToSpeak = section.text;
    if (section.type === 'bullets' && section.items) textToSpeak = section.items.join('. ');
    let audioMs = 0;
    if (onSpeak && textToSpeak) audioMs = await onSpeak(textToSpeak);
    const fallbackMs = textToSpeak ? (textToSpeak.trim().split(/\s+/).length / 150) * 60 * 1000 : 800;
    const durationMs = audioMs > 0 ? audioMs : fallbackMs;
    if (section.type === 'heading' || section.type === 'concept') revealWordsOver(index, section.text, durationMs);
    else if (section.type === 'bullets') revealWordsOver(index, (section.items || []).join(' '), durationMs);
    setTimeout(() => {
      if (!isMountedRef.current) return;
      setSpokenSections((prev) => [...prev, index]);
      playSection(index + 1);
    }, durationMs + 300);
  };

  useEffect(() => {
    isMountedRef.current = true;
    const timer = setTimeout(() => playSection(0), 150);
    return () => { isMountedRef.current = false; clearTimeout(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const ref = sectionRefs.current[currentSection];
    if (ref && ref.scrollIntoView) ref.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [currentSection]);

  const handleContinue = () => { if (onComplete) onComplete(); };

  const renderSection = (section, index) => {
    if (!section) return null;
    const isActive = index === currentSection;
    const isSpoken = spokenSections.includes(index);
    const wordsRevealed = revealedWords[index] || 0;

    const renderWords = (text, startOffset = 0) => {
      const words = text.split(/\s+/);
      return words.map((word, i) => {
        const globalIndex = startOffset + i;
        return (
          <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: isSpoken || globalIndex < wordsRevealed ? 1 : 0 }} transition={{ duration: 0.15 }}>
            {word}{' '}
          </motion.span>
        );
      });
    };

    return (
      <motion.div
        key={index}
        ref={(el) => (sectionRefs.current[index] = el)}
        className={`neo-section ${isActive ? 'active' : ''} ${isSpoken ? 'spoken' : ''}`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: isActive || isSpoken ? 1 : 0.35, y: 0, scale: isActive ? 1 : 0.98 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {section.type === 'heading' && <h2 className="neo-heading">{renderWords(section.text || '')}</h2>}

        {section.type === 'concept' && (
          <div className="neo-concept">
            {section.label && <span className="neo-concept-label">{section.label}</span>}
            <p className="neo-concept-text">{renderWords(section.text || '')}</p>
          </div>
        )}

        {section.type === 'bullets' && (() => {
          let offset = 0;
          return (
            <div className="neo-bullets">
              {section.label && <span className="neo-concept-label">{section.label}</span>}
              {(section.items || []).map((item, i) => {
                const itemWords = (item || '').split(/\s+/);
                const thisOffset = offset;
                offset += itemWords.length;
                const visible = isSpoken || wordsRevealed > thisOffset;
                return (
                  <motion.div key={i} className="neo-bullet" initial={{ opacity: 0, x: -12 }} animate={{ opacity: visible ? 1 : 0, x: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                    <span className="neo-bullet-dot" />
                    <span>{renderWords(item, thisOffset)}</span>
                  </motion.div>
                );
              })}
            </div>
          );
        })()}

        {section.type === 'scene' && (() => {
          const SceneComponent = SCENE_REGISTRY[section.sceneId];
          if (!SceneComponent) { console.warn(`Scene "${section.sceneId}" not registered.`); return null; }
          return (
            <div className="neo-scene-wrap">
              <SceneComponent step={sceneSteps[index] ?? 0} config={section.config || {}} accent={section.accent || '#1565C0'} />
              {section.caption && (
                <p className="neo-scene-caption">
                  {section.caption.split(/\s+/).map((word, i) => (
                    <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: isActive || isSpoken ? 1 : 0.4 }} transition={{ duration: 0.25, delay: i * 0.05 }}>
                      {word}{' '}
                    </motion.span>
                  ))}
                </p>
              )}
            </div>
          );
        })()}

        {section.type === 'example' && (
          <div className="neo-example">
            <span className="neo-example-label">📝 Worked Example</span>
            {section.scenario && <p className="neo-example-scenario">{section.scenario}</p>}
            {section.steps && section.steps.length > 0 && (
              <div className="neo-example-steps">
                {section.steps.map((step, i) => (
                  <motion.div key={i} className="neo-example-step" initial={{ opacity: 0, x: -12 }} animate={{ opacity: isActive || isSpoken ? 1 : 0.5, x: 0 }} transition={{ duration: 0.4, delay: i * 0.15 }}>
                    <span className="neo-example-step-num">{i + 1}</span>
                    <span>{step}</span>
                  </motion.div>
                ))}
              </div>
            )}
            {section.answer && (<div className="neo-example-answer"><strong>Answer:</strong> {section.answer}</div>)}
            {section.sceneId && SCENE_REGISTRY[section.sceneId] && (() => {
              const SceneComponent = SCENE_REGISTRY[section.sceneId];
              return (
                <div className="neo-scene-wrap">
                  <SceneComponent step={sceneSteps[index] ?? 0} config={section.config || {}} accent={section.accent || '#1565C0'} />
                </div>
              );
            })()}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="neo-teacher">
      <motion.div className="neo-teacher-header" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="neo-teacher-orb"><ThinkingOrb state={orbState} size={64} speed={1} /></div>
        <div className="neo-teacher-meta">
          <span className="neo-teacher-name">Neo</span>
          <span className="neo-teacher-status">{isPlaying ? 'Teaching you...' : 'Session complete'}</span>
        </div>
        {isPlaying && (
          <div className="neo-teacher-wave">
            {[...Array(5)].map((_, i) => (
              <motion.span key={i} className="neo-wave-bar" animate={{ scaleY: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }} />
            ))}
          </div>
        )}
      </motion.div>

      <div className="neo-teacher-body">
        {content && content.sections && content.sections.map((section, i) => renderSection(section, i))}
      </div>

      <AnimatePresence>
        {showContinue && (
          <motion.button className="neo-teacher-continue" onClick={handleContinue} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            I'm ready to practice <FaArrowRight />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NeoTeacher;