'use strict'

const counselingServices = [
	{
		id: 'familyPlanningCounselingAndServices',
		name: 'Family Planning Counseling and Services',
	},
	{
		id: 'infertilityCounseling',
		name: 'Infertility Counseling',
	},
	{
		id: 'miscarriageCounseling',
		name: 'Miscarriage Counseling',
	},
	{
		id: 'peerCounseling',
		name: 'Peer Counseling and/or Pregnancy Support Groups',
	},
	{
		id: 'postAbortionCounseling',
		name: 'Post-Abortion Counseling',
	},
	{
		id: 'sexualViolenceCounseling',
		name: 'Sexual Violence/Assault/Abuse Counseling',
	},
	{
		id: 'spiritualSupport',
		name: 'Spiritual Support',
	},
]

const examServices = [
	{
		id: 'breastExams',
		name: 'Breast Exams (Clinical)',
	},
	{
		id: 'cervicalCancerScreenings',
		name: 'Cervical Cancer Screenings',
	},
	{
		id: 'cervicalCancerPrevention',
		name: 'Cervical Cancer Prevention (HPV Vaccine)',
	},
	{
		id: 'mammography',
		name: 'Mammography (or referral)',
	},
	{
		id: 'papSmear',
		name: 'Pap Smear Test',
	},
	{
		id: 'pelvicExam',
		name: 'Pelvic Exam / Colposcopy',
	},
	{
		id: 'hivTreatmentServices',
		name: 'HIV Treatment Services',
	},
	{
		id: 'utiTestingTreatment',
		name: 'UTI Testing and Treatment',
	},
	{
		id: 'vaginalInfectionTestingTreatment',
		name: 'Vaginal Infection Testing and Treatment',
	},
	{
		id: 'ultrasound',
		name: 'Ultrasound',
	},
	{
		id: 'wellWomanCare',
		name: 'Well Woman Care',
	},
]

const educationServices = [
	{
		id: 'abortionEducation',
		name: 'Abortion Education',
	},
	{
		id: 'abortionAlternativeEducation',
		name: 'Abortion Alternative Education',
	},
	{
		id: 'fetalDevelopmentEducation',
		name: 'Fetal Development Education',
	},
	{
		id: 'fertilityCounselingPrevention',
		name: 'Fertility Counseling/Prevention',
	},
	{
		id: 'parentingClasses',
		name: 'Parenting Classes',
	},
	{
		id: 'stdEducation',
		name: 'Sexually Transmitted Diseases Education',
	},
]

const otherServices = [
	{
		id: 'coordinatedChildrensServicesInitiatives',
		name: "CCSI (Coordinated Children's Services Initiatives)",
	},
	{
		id: 'childGroupAngerManagement',
		name: 'Child Group Anger Management (12-16)',
	},
	{
		id: 'imageGroupSelfHarmingBehavior',
		name: 'IMAGE Group Self-harming behavior (12-18)',
	},
	{
		id: 'projectIris',
		name: 'Project Iris',
	},
	{
		id: 'projectRachel',
		name: 'Project Rachel',
	},
	{
		id: 'seawayHouse',
		name: 'Seaway House',
	},
	{
		id: 'leapToSuccessMentoring',
		name: 'LEAP to Success Mentoring',
	},
]

const pregnancyTestServices = [
	{
		id: 'freePregnancyTest',
		name: 'Free Pregnancy Test',
	},
	{
		id: 'medicalQualityPregnancyTest',
		name: 'Medical Quality Pregnancy Test',
	},
	{
		id: 'selfAdministeredPregnancyTest',
		name: 'Self-Administered Pregnancy Test',
	},
	{
		id: 'proofOfPregnancy',
		name: 'Proof of Pregnancy',
	},
]

const referralServices = [
	{
		id: 'adoptionAssistance',
		name: 'Adoption Assistance',
	},
	{
		id: 'materialAssistance',
		name: 'Material Assistance',
	},
	{
		id: 'educationalAssistance',
		name: 'Educational Assistance / GED',
	},
	{
		id: 'financialAssistance',
		name: 'Financial Assistance',
	},
	{
		id: 'careerAssistance',
		name: 'Career Assistance / Job Search',
	},
	{
		id: 'doctorPrimarySpecialtyCare',
		name: 'Doctor / Primary and Specialty Care',
	},
	{
		id: 'legal',
		name: 'Legal',
	},
	{
		id: 'licensedProfessionalCounselorReferral',
		name: 'Referral - Licensed Professional Counselors',
	},
	{
		id: 'socialServices',
		name: 'Social Services',
	},
	{
		id: 'wic',
		name: 'WIC (Women, Infant, and Child)',
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
