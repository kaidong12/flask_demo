*** Settings ***
Library           String
Library           Collections
Library           Process
Library           OperatingSystem
Resource          Bap.robot
Resource          Can.robot
Resource          Diag.robot
Resource          Phybox.robot
Resource          EcuTrace.robot
Resource          Ethernet.robot
Resource          RaptorDriver.robot
Resource          PythonPath.robot
Resource          SSH.robot
Resource          Variables.robot
Resource          Ethernet.robot
Resource          Rbs.robot
Resource          LocalUtil.robot
Suite Teardown    Terminate All Processes    kill=False

*** Variables ***
${localPdxFilePath}    C:/Users/T6VU9I6/Downloads/FL_3JD035741_M104_CONMODMQBW_V001_E.pdx
${localImgFilePath}    C:/Users/T6VU9I6/Downloads/DA2521-04_flashing_images_M046.tar.gz
${oruImgFilePath}     /home/pi/oru/
@{IMAGES}    custapp_ubi.img    carrier_ubi.img    system_ubi.img    ro.bin    otherubi.bin    nv.bin    xloader.bin


*** Test Cases ***

[OCU-5615] SW-Update via DoIP
    [tags]    OCU-5615    ACCEPTANCE
    InitCan
	InitEth	
	KL15_ON_CAN
	KL15_ON_ETH
    ${remoteFilePath}           SCP From Local To Raptor    ${localPdxFilePath}    /home/pi/
    ${ret}                      Doip Flash        ${remoteFilePath}
    Should Be Equal             ${ret}            True

[OCU-5890]Offline tracing via Eth 
    [tags]    OCU-5890    ACCEPTANCE
    InitCan
	InitEth
	KL15_ON_CAN
	KL15_ON_ETH
	PortForwardingStopAll
	PortForwardingStartByTemplate        ConMod MQBevo SSH
	${ret}         CallRaptorDriver   DownloadEcuLog        /system/etc/version.xml
	Log         ${ret} 
	Should Be Equal   ${ret}   True

[OCU-5892]Online or Offline trace is readable(English)
    [tags]    OCU-5892    ACCEPTANCE
	StopEth
	StopCan
    InitCan
	InitEth
	KL15_ON_CAN
	KL15_ON_ETH
    Sleep    10s
	KL15_OFF_CAN
    KL15_OFF_ETH

	DeleteEthernetTraces
	StartEthernetTrace
	Sleep    10s
	StopEthernetTrace
	DownloadEthernetTraces                   EthernetTrace	
	ReceiveEthernetMsg        0x50670C00   400        0 
	PortForwardingStopAll
	PortForwardingStartByTemplate   ConMod MQBevo Serial2

	ECU_TRACE_START
	ECU_TRACE_STATUS	
	KL15_OFF_CAN
	KL15_OFF_ETH
	KL15_ON_CAN
	KL15_ON_ETH
    Sleep    3s
	ECU_TRACE_STOP
	ECU_TRACE_FIND_INIT                 NAD_miscell             OPERATION_FULL 

[OCU-6264] Operation_full
    [tags]    OCU-6264    ACCEPTANCE
    InitCan
	InitEth	
	KL15_ON_CAN
	KL15_ON_ETH
	Sleep    60s
	PortForwardingStopAll
	PortForwardingStartByTemplate   ConMod MQBevo Serial2
	ECU_TRACE_START
	ECU_TRACE_STATUS	
	KL15_OFF_CAN
	KL15_OFF_ETH
	KL15_ON_CAN
	KL15_ON_ETH
    Sleep    3s
	ECU_TRACE_STOP
	ECU_TRACE_FIND_INIT                 NAD_miscell             OPERATION_FULL  
# Requires CAN/ETH activated and Port Forwarding for Serial2 activated
[OCU-5685] Backend availability checking via R&P
    [tags]    OCU-5685    ACCEPTANCE
    ECU_TRACE_START
	ECU_TRACE_STATUS	
	EthernetSendVIN            BVWLFVCJZ22011834
    Sleep    10s
	ECU_TRACE_STOP
    ECU_TRACE_FIND_INIT                 JAVA             REGISTRATION_DONE 
	ECU_TRACE_FIND_INIT                 JAVA             CONNECTED
	PortForwardingStopAll

[OCU-5593] ETH communication rate
    [tags]    OCU-5593    ACCEPTANCE
	StopEth
	GetEth
	InitEth
	EthIsActive
	KL15_ON_ETH
	${GetEthRate}      GetEthRate
	Log    ${GetEthRate}
	Should Be Equal As Strings    ${GetEthRate}    100Mb/s

[OCU-5570] ConMod wake up via any can message
    [tags]    OCU-5570    ACCEPTANCE
    StopEth
	StopCan
    InitCan
	InitEth
	KL15_ON_CAN
	KL15_ON_ETH
    Sleep    10s
	KL15_OFF_CAN
    KL15_OFF_ETH
	DeleteEthernetTraces
	StartEthernetTrace
	Sleep    10s
	StopEthernetTrace
	DownloadEthernetTraces                   EthernetTrace	
	ReceiveEthernetMsg        0x50670C00   400        0 
	Sleep    360s
    InitCan
	InitEth	
	KL15_ON_CAN
	DeleteEthernetTraces
	StartEthernetTrace
	Sleep    60s
	StopEthernetTrace
	DownloadEthernetTraces                   EthernetTrace	
	ReceiveEthernetMsg        0x50670C00   400        1   
[OCU-5591] VLAN Implement
    [tags]    OCU-5591    ACCEPTANCE
	StopEth
	StopCan
    InitCan
	InitEth
	KL15_ON_CAN
	KL15_ON_ETH
    Sleep    20s
	SshSendCommand               ping fd53:7cb8:383:4::67
	SshSendCommand               ping fd53:7cb8:383:4::1:1b5
	SshSendCommand               ping fd53:7cb8:383:4::1:1b6
[OCU-5556] BAP supported
    [tags]    OCU-5556    ACCEPTANCE  
    StopEth
	StopCan
    InitCan
	InitEth
	KL15_ON_CAN
	KL15_ON_ETH
    Sleep    10s
	DeleteEthernetTraces
	StartEthernetTrace
	Sleep    120s
	StopEthernetTrace
	DownloadEthernetTraces                   EthernetTrace	
	ReceiveEthernetMsg        0x38003300   1000        1

[OCU-5639] DoIP connection establishment
    [tags]    OCU-5639    ACCEPTANCE
    Sleep    3s
	# Disconnect Doip Server
	Connect Doip Server
	Status Doip Server
	Doip Server Is Connected
	Status Doip Server
	
[OCU-5715] Read antenna cellular status via diagnosis
    [tags]    OCU-5715    ACCEPTANCE
    ${retVal}         Send Diagnosis      22        1A,63
	Check If Basic Response Is Correct    ${retVal}    1A,63    62
	
[OCU-6131] Diagnosis Identification	
    [tags]    OCU-6131    ACCEPTANCE
	${retVal}    Send Diagnosis     22    F1,91
	Check If Basic Response Is Correct    ${retVal}    F1,91    62
	
[OCU-6247] Read the VKMS parameters of the ConMod
    [tags]    OCU-6247    ACCEPTANCE
    ${retVal}    Send Diagnosis    22    2C,55
	Check If Basic Response Is Correct    ${retVal}    2C,55    62

[OCU-6259] Authentic Time of ConMod
    [tags]    OCU-6259    ACCEPTANCE
	${retVal}    Send Diagnosis     22    22,B3
	Check If Basic Response Is Correct    ${retVal}    22,B3    62
	
[OCU-6260] ConMod has V2X certificates
    [tags]    OCU-6260    ACCEPTANCE
	${retVal}    Send Diagnosis     22    03,6A
	Check If Basic Response Is Correct    ${retVal}    03,6A    62
	
[OCU-6412] Diagnosis Measurement
    [tags]    OCU-6412    ACCEPTANCE
    ${retVal}         Send Diagnosis       22        41,E6
	Check If Basic Response Is Correct    ${retVal}    41,E6    62
[OCU-6413] Routine
    [tags]    OCU-6413    ACCEPTANCE
	Tester Present On
	Send Diagnosis    10    03
	${retVal}    Send Diagnosis     31    01030905
	Check If Basic Response Is Correct    ${retVal}    0103    71
	Tester Present Off
	
[OCU-5705] Configure support GPS/BEIDO by AT command    
    [tags]    OCU-5705    ACCEPTANCE
    InitCan
    KL15_ON_CAN
    InitEth
    KL15_ON_ETH
    sleep    30s
    #Configure ConMod support BEIDOU via AT command
    SshSendSystemTestCommand    1;1;0;9;4;5
    sleep    10s
    StartEthernetTrace
    sleep    10s
    StopEthernetTrace
    DownloadEthernetTraces    GNSS_trace
    sleep    10s
    CheckIfEthernetSignalPayloadAppears    GNSS_trace    VLAN::POS_GNSS_NAD_01::POS_GNSS_03_Status::POS_GNSS_Ortung_FIX_Typ    3
    #Check the ETH signal:
    CheckIfEthernetSignalPayloadInRange    GNSS_trace    VLAN::POS_GNSS_NAD_01::POS_GNSS_07_Sat_konf::POS_GNSS_Sichtbare_Satelliten    1    126
    CheckIfEthernetSignalPayloadInRange    GNSS_trace    VLAN::POS_GNSS_NAD_01::POS_GNSS_07_Sat_konf::POS_GNSS_Genutzte_Satelliten    1    126
    CheckIfEthernetSignalPayloadInRange    GNSS_trace    VLAN::POS_GNSS_NAD_01::POS_GNSS_07_Sat_konf::POS_GNSS_Empfangbare_Satelliten    1    126
    CheckIfEthernetSignalPayloadAppears    GNSS_trace    VLAN::POS_GNSS_NAD_01::POS_GNSS_07_Sat_konf::POS_GNSS_System_BEIDOU_Status    1
    CheckIfEthernetSignalPayloadAppears    GNSS_trace    VLAN::POS_GNSS_NAD_01::POS_GNSS_07_Sat_konf::POS_GNSS_System_GPS_Status    1

[OCU-6183] Number of usable satellites > 10 after 2min. of startup
    [tags]    OCU-6183    ACCEPTANCE
    InitCan
    KL15_ON_CAN
    InitEth
    KL15_ON_ETH
    sleep    10s
    StartEthernetTrace
    sleep    10s
    StopEthernetTrace
    DownloadEthernetTraces    GNSS_trace
    sleep    10s
    CheckIfEthernetSignalPayloadAppears    GNSS_trace    VLAN::POS_GNSS_NAD_01::POS_GNSS_03_Status::POS_GNSS_Ortung_FIX_Typ    3
    #Check the ETH signal:
    CheckIfEthernetSignalPayloadInRange    GNSS_trace    VLAN::POS_GNSS_NAD_01::POS_GNSS_07_Sat_konf::POS_GNSS_Sichtbare_Satelliten    10    100
	
[OCU-5724] GNSS data send to Ethernet - Positioning
    [tags]    OCU-5724    ACCEPTANCE
    InitCan
    KL15_ON_CAN
    InitEth
    KL15_ON_ETH
    sleep    10s
    StartEthernetTrace
    sleep    10s
    StopEthernetTrace
    DownloadEthernetTraces    GNSS_trace
    sleep    10s
    CheckIfEthernetSignalPayloadAppears    GNSS_trace    VLAN::POS_GNSS_NAD_01::POS_GNSS_03_Status::POS_GNSS_Ortung_FIX_Typ    3
    #Check the ETH signal:
	${Breite}    GetEthernetPayloadBySignalName    GNSS_trace    VLAN::POS_GNSS_NAD_01::POS_GNSS_05_Position::POS_GNSS_Breite_Ortung
	${Laenge}    GetEthernetPayloadBySignalName    GNSS_trace    VLAN::POS_GNSS_NAD_01::POS_GNSS_05_Position::POS_GNSS_Laenge_Ortung
	${deviation}    CompareCoordination_ConMOD_MQBw    ${Breite}     ${Laenge}
	log       ${deviation}
	Should Not Contain        ${deviation}         false	
