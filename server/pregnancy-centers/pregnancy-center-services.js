'use strict'

const counselingServices = [
	{
		id: 'familyPlanningCounselingAndServices',
		name: 'Family Planning Counseling and Services',
		description:
			'Educational, comprehensive medical or social activities which enable individuals, including minors, to determine freely the number and spacing of their children and to select the means by which this may be achieved.',
	},
	{
		id: 'infertilityCounseling',
		name: 'Infertility Counseling',
		description: '',
	},
	{
		id: 'miscarriageCounseling',
		name: 'Miscarriage Counseling',
		description: '',
	},
	{
		id: 'peerCounseling',
		name: 'Peer Counseling and/or Pregnancy Support Groups',
		description: '',
	},
	{
		id: 'postAbortionCounseling',
		name: 'Post-Abortion Counseling',
		description: '',
	},
	{
		id: 'sexualViolenceCounseling',
		name: 'Sexual Violence/Assault/Abuse Counseling',
		description: '',
	},
	{
		id: 'spiritualSupport',
		name: 'Spiritual Support',
		description: '',
	},
]

const examServices = [
	{
		id: 'breastExams',
		name: 'Breast Exams (Clinical)',
		description:
			'An examination of skin, breast tissue, and underarm by a doctor or nurse during physical. This may include probing with pads of fingers to detect for lumps and a mammogram. These are recommended every 3 years after age 20 and every year after age 40.',
	},
	{
		id: 'cervicalCancerScreenings',
		name: 'Cervical Cancer Screenings',
		description: '',
	},
	{
		id: 'cervicalCancerPrevention',
		name: 'Cervical Cancer Prevention (HPV Vaccine)',
		description: '',
	},
	{
		id: 'mammography',
		name: 'Mammography (or referral)',
		description: '',
	},
	{
		id: 'papSmear',
		name: 'Pap Smear Test',
		description: '',
	},
	{
		id: 'pelvicExam',
		name: 'Pelvic Exam / Colposcopy',
		description: '',
	},
	{
		id: 'hivTreatmentServices',
		name: 'HIV Treatment Services',
		description: '',
	},
	{
		id: 'utiTestingTreatment',
		name: 'UTI Testing and Treatment',
		description: '',
	},
	{
		id: 'vaginalInfectionTestingTreatment',
		name: 'Vaginal Infection Testing and Treatment',
		description: '',
	},
	{
		id: 'ultrasound',
		name: 'Ultrasound',
		description: '',
	},
	{
		id: 'wellWomanCare',
		name: 'Well Woman Care',
		description: '',
	},
]

const educationServices = [
	{
		id: 'abortionEducation',
		name: 'Abortion Education',
		description: '',
	},
	{
		id: 'abortionAlternativeEducation',
		name: 'Abortion Alternative Education',
		description: '',
	},
	{
		id: 'fetalDevelopmentEducation',
		name: 'Fetal Development Education',
		description: '',
	},
	{
		id: 'fertilityCounselingPrevention',
		name: 'Fertility Counseling/Prevention',
		description: '',
	},
	{
		id: 'parentingClasses',
		name: 'Parenting Classes',
		description: '',
	},
	{
		id: 'stdEducation',
		name: 'Sexually Transmitted Diseases Education',
		description: '',
	},
]

const otherServices = [
	{
		id: 'coordinatedChildrensServicesInitiatives',
		name: "CCSI (Coordinated Children's Services Initiatives)",
		description: '',
	},
	{
		id: 'childGroupAngerManagement',
		name: 'Child Group Anger Management (12-16)',
		description: '',
	},
	{
		id: 'imageGroupSelfHarmingBehavior',
		name: 'IMAGE Group Self-harming behavior (12-18)',
		description: '',
	},
	{
		id: 'projectIris',
		name: 'Project Iris',
		description: '',
	},
	{
		id: 'projectRachel',
		name: 'Project Rachel',
		description: '',
	},
	{
		id: 'seawayHouse',
		name: 'Seaway House',
		description: '',
	},
	{
		id: 'leapToSuccessMentoring',
		name: 'LEAP to Success Mentoring',
		description: '',
	},
]

const pregnancyTestServices = [
	{
		id: 'freePregnancyTest',
		name: 'Free Pregnancy Test',
		description: '',
	},
	{
		id: 'medicalQualityPregnancyTest',
		name: 'Medical Quality Pregnancy Test',
		description: '',
	},
	{
		id: 'selfAdministeredPregnancyTest',
		name: 'Self-Administered Pregnancy Test',
		description: '',
	},
	{
		id: 'proofOfPregnancy',
		name: 'Proof of Pregnancy',
		description: '',
	},
]

const referralServices = [
	{
		id: 'adoptionAssistance',
		name: 'Adoption Assistance',
		description: '',
	},
	{
		id: 'materialAssistance',
		name: 'Material Assistance',
		description: '',
	},
	{
		id: 'educationalAssistance',
		name: 'Educational Assistance / GED',
		description: '',
	},
	{
		id: 'financialAssistance',
		name: 'Financial Assistance',
		description: '',
	},
	{
		id: 'careerAssistance',
		name: 'Career Assistance / Job Search',
		description: '',
	},
	{
		id: 'doctorPrimarySpecialtyCare',
		name: 'Doctor / Primary and Specialty Care',
		description: '',
	},
	{
		id: 'legal',
		name: 'Legal',
		description: '',
	},
	{
		id: 'licensedProfessionalCounselorReferral',
		name: 'Referral - Licensed Professional Counselors',
		description: '',
	},
	{
		id: 'socialServices',
		name: 'Social Services',
		description: '',
	},
	{
		id: 'wic',
		name: 'WIC (Women, Infant, and Child)',
		description: '',
	},
]

// exports.services = [
// 	{
// 		id: 'abortionPillReversal',
// 		name: 'Abortion Pill Reversal',
// 	},
// 	{
// 		id: 'licensedProfessionalCounseling',
// 		name: 'Licensed Professional Counseling',
// 	},
// 	{
// 		id: 'materialAssistance',
// 		name: 'Material Assistance',
// 	},
// 	{
// 		id: 'medicalQualityPregnancyTest',
// 		name: 'Medical Quality Pregnancy Test',
// 	},
// 	{
// 		id: 'naProTechnology',
// 		name: 'NaProTECHNOLOGY',
// 	},
// 	{
// 		id: 'parentingClasses',
// 		name: 'Parenting Classes',
// 	},
// 	{
// 		id: 'peerCounseling',
// 		name: 'Peer Counseling',
// 	},
// 	{
// 		id: 'postAbortionCounseling',
// 		name: 'Post-Abortion Counseling',
// 	},
// 	{
// 		id: 'prenatalCare',
// 		name: 'Prenatal Care',
// 	},
//
// 	{
// 		id: 'spiritualDirection',
// 		name: 'Spiritual Direction',
// 	},
// 	{
// 		id: 'stdTesting',
// 		name: 'STD Testing',
// 	},
// ]

exports.counselingServices = counselingServices
exports.educationServices = educationServices
exports.examServices = examServices
exports.otherServices = otherServices
exports.pregnancyTestServices = pregnancyTestServices
exports.referralServices = referralServices

exports.pregnancyCenterServices = [
	...counselingServices,
	...educationServices,
	...examServices,
	...otherServices,
	...pregnancyTestServices,
	...referralServices,
]
