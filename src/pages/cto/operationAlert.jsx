import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { message } from 'antd';
import useBreakpointCheck from "../../hooks/useBreakpointCheck";
import Radio from "@/components/radio";
import GradientSwitch from "@/components/gradientSwitch";
import DatePicker from "@/components/datePicker";
import Select from '@/components/select';
import Checkbox from "@/components/checkbox";
import InputNumber from '@/components/inputNumber';
import { importWalletsFromExcel } from "@/utils/excel.js";
import {
    repurchaseSetApi,
    repurchaseSetListApi,
    dividendRuleApi,
    dividendRuleQueryApi,
    burnSettingApi,
    burnSettingQueryApi,
} from "@/api/cto.js";
import { mul, div } from "@/utils/number.js";
import moment from 'moment';

export default function Index({type=0,ctoProjId,tokenContractAddr,show,onClose}) {
    const { t } = useTranslation();
    const shouldRender = useBreakpointCheck();
    const [curIdx, setCurIdx] = useState(type==undefined?0:type);
    const [count, setCount] = useState(0);
    const handleChange = (newValue,fixed,onResult) => {
        if (newValue === '' || /^(?:0|[1-9]\d*)(?:\.\d*)?$/.test(newValue) || newValue === '.') {
            if(fixed) {
                onResult && onResult(newValue);
            }else{
                if (newValue === '') {
                    onResult && onResult(newValue);
                }else{
                    if(newValue<=0) {
                        onResult && onResult(newValue);
                    }else{
                        onResult && onResult(div(newValue,100,6));
                    }
                }
            }
        }
    }
    const updateSetObj = (obj,val) => {
        if(!obj) return obj;
        if(obj.amountType=='fixed') {
            return {...obj,...{fixedAmount:val}};
        }else{
            return {...obj,...{poolRatio:val}};
        }
    }
    const showPoolRatio = (ratio) => {
        return ratio==0?ratio:mul(ratio,100,6);
    }
    const handleImport = async () => {
        try {
            const list = await importWalletsFromExcel();
            setAddressList(list.join(','));
        } catch (err) {
            message.error(err.message);
        }
    };

    const [buybackStatus, setBuybackStatus] = useState('in_progress');// 'in_progress' | 'completed' | 'closed'
    const [buybackCycleType,setBuybackCycleType] = useState('continuous');// 'continuous' | 'limited'
    const [buybackEndTime,setBuybackEndTime] = useState(null);
    const [buybackRandomStrategyEnabled,setBuybackRandomStrategyEnabled] = useState(false);
    const [buybackRandomCycleHour,setBuybackRandomCycleHour] = useState(24);// 24 ｜ 48
    const [buybackRandomOnceSet,setBuybackRandomOnceSet] = useState({
        amountType: "fixed",// fixed/pool_ratio
        fixedAmount: '',
        poolRatio: '',
    });
    const [buybackIndicatorStrategyEnabled,setBuybackIndicatorStrategyEnabled] = useState(false);
    const [buybackBullTrendEnabled,setBuybackBullTrendEnabled] = useState(false);
    const [buybackBullOnceSet,setBuybackBullOnceSet] = useState({
        amountType: "fixed",
        fixedAmount: '',
        poolRatio: '',
    });
    const [buybackBearTrendEnabled,setBuybackBearTrendEnabled] = useState(false);
    const [buybackBearOnceSet,setBuybackBearOnceSet] = useState({
        amountType: "fixed",
        fixedAmount: '',
        poolRatio: '',
    });
    const [buybackSpecialMarketEnabled,setBuybackSpecialMarketEnabled] = useState(false);
    const [buybackSpecialMarketOnceSet,setBuybackSpecialMarketOnceSet] = useState({
        amountType: "fixed",
        fixedAmount: '',
        poolRatio: '',
    });
    const [buybackOversoldEnabled,setBuybackOversoldEnabled] = useState(false);
    const [buybackOversoldOnceSet,setBuybackOversoldOnceSet] = useState({
        amountType: "fixed",
        fixedAmount: '',
        poolRatio: '',
    });
    const refreshBuybackSet = () => {
        if(ctoProjId) {
            repurchaseSetListApi({ctoProjId,tokenContractAddr,status:"",page:1,pageSize:10}).then(({data})=>{
                if(data&&Array.isArray(data)) {
                    const item = data[0];
                    setBuybackStatus(item.status);
                    setBuybackCycleType(item.cycleType);
                    setBuybackEndTime(item.endTime?moment.unix(item.endTime):null);
                    setBuybackRandomStrategyEnabled(item.randomStrategyEnabled);
                    setBuybackRandomCycleHour(item.randomCycleHour);
                    setBuybackRandomOnceSet(item.randomOnceSet);
                    setBuybackIndicatorStrategyEnabled(item.indicatorStrategyEnabled);
                    setBuybackBullTrendEnabled(item.bullTrendEnabled);
                    setBuybackBullOnceSet(item.bullOnceSet);
                    setBuybackBearTrendEnabled(item.bearTrendEnabled);
                    setBuybackBearOnceSet(item.bearOnceSet);
                    setBuybackSpecialMarketEnabled(item.specialMarketEnabled);
                    setBuybackSpecialMarketOnceSet(item.specialMarketOnceSet);
                    setBuybackOversoldEnabled(item.oversoldEnabled);
                    setBuybackOversoldOnceSet(item.oversoldOnceSet);
                }
            });
        }
    }
    useEffect(()=>{
        if(show) {
            if(curIdx==0) {
                refreshBuybackSet();
            }else if(curIdx==1) {
                refreshDividendsSet();
            }else if(curIdx==2) {
                refreshDestroySet();
            }
        }
    },[ctoProjId,show,curIdx]);
    const saveBuyback = () => {
        repurchaseSetApi({
            id:0,
            ctoProjId,
            tokenContractAddr,
            baseTokenContractAddr:'sol',
            status:buybackStatus,
            cycleType:buybackCycleType,
            endTime:buybackEndTime?buybackEndTime.unix():'',
            randomStrategyEnabled:buybackRandomStrategyEnabled,
            randomCycleHour:Number(buybackRandomCycleHour),
            randomOnceSet:buybackRandomOnceSet,
            indicatorStrategyEnabled:buybackIndicatorStrategyEnabled,
            bullTrendEnabled:buybackBullTrendEnabled,
            bullOnceSet:buybackBullOnceSet,
            bearTrendEnabled:buybackBearTrendEnabled,
            bearOnceSet:buybackBearOnceSet,
            specialMarketEnabled:buybackSpecialMarketEnabled,
            specialMarketOnceSet:buybackSpecialMarketOnceSet,
            oversoldEnabled:buybackOversoldEnabled,
            oversoldOnceSet:buybackOversoldOnceSet,
        }).then(()=>{
            message.success(t('616'));
            refreshBuybackSet();
        });
    }
    const renderBuyback = () => {
        return <>
        {shouldRender?<ModalContent>
            <RowTitle>{t('309')}</RowTitle>
            <RowColumn>
                <GradientSwitch disabled={buybackStatus=='completed'} checked={buybackStatus=='in_progress'} onChange={val=>setBuybackStatus(val?'in_progress':'closed')}/>
            </RowColumn>
            <RowTitle>{t('21048')}</RowTitle>
            <RowColumn>
                <RowColumnRow>
                    <Radio title={t('21049')} checked={buybackCycleType=='continuous'} onChange={val=>setBuybackCycleType('continuous')}/>
                    <RowTip>{t('21050')}</RowTip>
                </RowColumnRow>
                <RowColumnRow>
                    <Radio title={t('21051')} checked={buybackCycleType=='limited'} onChange={val=>setBuybackCycleType('limited')}/>
                    <RowTip>{t('21052')}</RowTip>
                </RowColumnRow>
                <RowColumnRow>
                    <RowText>{t('21053')}</RowText>
                    <DatePicker value={buybackEndTime} onChange={val=>setBuybackEndTime(val)} />
                </RowColumnRow>
            </RowColumn>
            <RowTitle>{t('21054')}</RowTitle>
            <RowColumn>
                <GradientSwitch title={t('21055')} checked={buybackRandomStrategyEnabled} onChange={val=>setBuybackRandomStrategyEnabled(val)}/>
                <RowColumnRow>
                    <RowText>{t('21056')}</RowText>
                    <Select value={buybackRandomCycleHour} onChange={val=>setBuybackRandomCycleHour(val)} options={[{label: t('21072'), value: 24},{label: t('21073'), value: 48}]}/>
                </RowColumnRow>
                <RowColumnRow>
                    <RowText>{t('21057')}</RowText>
                    <Select value={buybackRandomOnceSet.amountType} onChange={val=>setBuybackRandomOnceSet({...buybackRandomOnceSet,amountType:val})} options={[{label: t('21036'), value: 'fixed'},{label: t('21037'), value: 'pool_ratio'}]}/>
                    <MyInputNumber value={buybackRandomOnceSet.amountType=='fixed'?buybackRandomOnceSet.fixedAmount:showPoolRatio(buybackRandomOnceSet.poolRatio)} unit={buybackRandomOnceSet.amountType=='fixed'?"SOL":"%"} onChange={e=>handleChange(e.target.value,buybackRandomOnceSet.amountType=='fixed',val=>setBuybackRandomOnceSet(updateSetObj(buybackRandomOnceSet,val)))}/>
                </RowColumnRow>
                <GradientSwitch title={t('21058')} checked={buybackIndicatorStrategyEnabled} onChange={val=>setBuybackIndicatorStrategyEnabled(val)}/>
                <RowColumnGrid>
                    <Checkbox title={t('21059')} checked={buybackBullTrendEnabled} onChange={val=>setBuybackBullTrendEnabled(val)}/>
                    <RowColumn>
                        <RowTip>{t('21060')}</RowTip>
                        <RowColumnRow>
                            <Select value={buybackBullOnceSet.amountType} onChange={val=>setBuybackBullOnceSet({...buybackBullOnceSet,amountType:val})} options={[{label: t('21036'), value: 'fixed'},{label: t('21037'), value: 'pool_ratio'}]}/>
                            <MyInputNumber value={buybackBullOnceSet.amountType=='fixed'?buybackBullOnceSet.fixedAmount:showPoolRatio(buybackBullOnceSet.poolRatio)} unit={buybackBullOnceSet.amountType=='fixed'?"SOL":"%"} onChange={e=>handleChange(e.target.value,buybackBullOnceSet.amountType=='fixed',val=>setBuybackBullOnceSet(updateSetObj(buybackBullOnceSet,val)))}/>
                        </RowColumnRow>
                    </RowColumn>
                    <Checkbox title={t('21061')} checked={buybackBearTrendEnabled} onChange={val=>setBuybackBearTrendEnabled(val)}/>
                    <RowColumn>
                        <RowTip>{t('21062')}</RowTip>
                        <RowColumnRow>
                            <Select value={buybackBearOnceSet.amountType} onChange={val=>setBuybackBearOnceSet({...buybackBearOnceSet,amountType:val})} options={[{label: t('21036'), value: 'fixed'},{label: t('21037'), value: 'pool_ratio'}]}/>
                            <MyInputNumber value={buybackBearOnceSet.amountType=='fixed'?buybackBearOnceSet.fixedAmount:showPoolRatio(buybackBearOnceSet.poolRatio)} unit={buybackBearOnceSet.amountType=='fixed'?"SOL":"%"} onChange={e=>handleChange(e.target.value,buybackBearOnceSet.amountType=='fixed',val=>setBuybackBearOnceSet(updateSetObj(buybackBearOnceSet,val)))}/>
                        </RowColumnRow>
                    </RowColumn>
                    <Checkbox title={t('21063')} checked={buybackSpecialMarketEnabled} onChange={val=>setBuybackSpecialMarketEnabled(val)}/>
                    <RowColumn>
                        <RowTip>{t('21064')}</RowTip>
                        <RowColumnRow>
                            <Select value={buybackSpecialMarketOnceSet.amountType} onChange={val=>setBuybackSpecialMarketOnceSet({...buybackSpecialMarketOnceSet,amountType:val})} options={[{label: t('21036'), value: 'fixed'},{label: t('21037'), value: 'pool_ratio'}]}/>
                            <MyInputNumber value={buybackSpecialMarketOnceSet.amountType=='fixed'?buybackSpecialMarketOnceSet.fixedAmount:showPoolRatio(buybackSpecialMarketOnceSet.poolRatio)} unit={buybackSpecialMarketOnceSet.amountType=='fixed'?"SOL":"%"} onChange={e=>handleChange(e.target.value,buybackSpecialMarketOnceSet.amountType=='fixed',val=>setBuybackSpecialMarketOnceSet(updateSetObj(buybackSpecialMarketOnceSet,val)))}/>
                        </RowColumnRow>
                    </RowColumn>
                    <Checkbox title={t('21061')} checked={buybackOversoldEnabled} onChange={val=>setBuybackOversoldEnabled(val)}/>
                    <RowColumn>
                        <RowTip>{t('21065')}</RowTip>
                        <RowColumnRow>
                            <Select value={buybackOversoldOnceSet.amountType} onChange={val=>setBuybackOversoldOnceSet({...buybackOversoldOnceSet,amountType:val})} options={[{label: t('21036'), value: 'fixed'},{label: t('21037'), value: 'pool_ratio'}]}/>
                            <MyInputNumber value={buybackOversoldOnceSet.amountType=='fixed'?buybackOversoldOnceSet.fixedAmount:showPoolRatio(buybackOversoldOnceSet.poolRatio)} unit={buybackOversoldOnceSet.amountType=='fixed'?"SOL":"%"} onChange={e=>handleChange(e.target.value,buybackOversoldOnceSet.amountType=='fixed',val=>setBuybackOversoldOnceSet(updateSetObj(buybackOversoldOnceSet,val)))}/>
                        </RowColumnRow>
                    </RowColumn>
                </RowColumnGrid>
            </RowColumn>
        </ModalContent>
        :<ModalContentH5>
            <RowTitle>{t('309')}</RowTitle>
            <RowContent>
                <GradientSwitch disabled={buybackStatus=='completed'} checked={buybackStatus=='in_progress'} onChange={val=>setBuybackStatus(val?'in_progress':'closed')}/>
            </RowContent>
            <RowTitle>{t('21048')}</RowTitle>
            <RowContent>
                <div>
                    <Radio title={t('21049')} checked={buybackCycleType=='continuous'} onChange={val=>setBuybackCycleType('continuous')}/>
                    <RowTip>{t('21050')}</RowTip>
                </div>
                <div>
                    <Radio title={t('21051')} checked={buybackCycleType=='limited'} onChange={val=>setBuybackCycleType('limited')}/>
                    <RowTip>{t('21052')}</RowTip>
                </div>
                <RowText>{t('21053')}</RowText>
                <DatePicker value={buybackEndTime} onChange={val=>setBuybackEndTime(val)} />
            </RowContent>
            <RowTitle>{t('21054')}</RowTitle>
            <RowContent>
                <GradientSwitch title={t('21055')} checked={buybackRandomStrategyEnabled} onChange={val=>setBuybackRandomStrategyEnabled(val)}/>
                <RowText>{t('21056')}</RowText>
                <Select value={buybackRandomCycleHour} onChange={val=>setBuybackRandomCycleHour(val)} options={[{label: t('21072'), value: 24},{label: t('21073'), value: 48}]}/>
                <RowText>{t('21057')}</RowText>
                <RowContentColumn>
                    <Select value={buybackRandomOnceSet.amountType} onChange={val=>setBuybackRandomOnceSet({...buybackRandomOnceSet,amountType:val})} options={[{label: t('21036'), value: 'fixed'},{label: t('21037'), value: 'pool_ratio'}]}/>
                    <MyInputNumber value={buybackRandomOnceSet.amountType=='fixed'?buybackRandomOnceSet.fixedAmount:showPoolRatio(buybackRandomOnceSet.poolRatio)} unit={buybackRandomOnceSet.amountType=='fixed'?"SOL":"%"} onChange={e=>handleChange(e.target.value,buybackRandomOnceSet.amountType=='fixed',val=>setBuybackRandomOnceSet(updateSetObj(buybackRandomOnceSet,val)))}/>
                </RowContentColumn>
            </RowContent>
            <RowContent>
                <GradientSwitch title={t('21058')} checked={buybackIndicatorStrategyEnabled} onChange={val=>setBuybackIndicatorStrategyEnabled(val)}/>
                <div>
                    <Checkbox title={t('21059')} checked={buybackBullTrendEnabled} onChange={val=>setBuybackBullTrendEnabled(val)}/>
                    <RowTip>{t('21060')}</RowTip>
                </div>
                <RowContentColumn>
                    <Select value={buybackBullOnceSet.amountType} onChange={val=>setBuybackBullOnceSet({...buybackBullOnceSet,amountType:val})} options={[{label: t('21036'), value: 'fixed'},{label: t('21037'), value: 'pool_ratio'}]}/>
                    <MyInputNumber value={buybackBullOnceSet.amountType=='fixed'?buybackBullOnceSet.fixedAmount:showPoolRatio(buybackBullOnceSet.poolRatio)} unit={buybackBullOnceSet.amountType=='fixed'?"SOL":"%"} onChange={e=>handleChange(e.target.value,buybackBullOnceSet.amountType=='fixed',val=>setBuybackBullOnceSet(updateSetObj(buybackBullOnceSet,val)))}/>
                </RowContentColumn>
                <div>
                    <Checkbox title={t('21061')} checked={buybackBearTrendEnabled} onChange={val=>setBuybackBearTrendEnabled(val)}/>
                    <RowTip>{t('21062')}</RowTip>
                </div>
                <RowContentColumn>
                    <Select value={buybackBearOnceSet.amountType} onChange={val=>setBuybackBearOnceSet({...buybackBearOnceSet,amountType:val})} options={[{label: t('21036'), value: 'fixed'},{label: t('21037'), value: 'pool_ratio'}]}/>
                    <MyInputNumber value={buybackBearOnceSet.amountType=='fixed'?buybackBearOnceSet.fixedAmount:showPoolRatio(buybackBearOnceSet.poolRatio)} unit={buybackBearOnceSet.amountType=='fixed'?"SOL":"%"} onChange={e=>handleChange(e.target.value,buybackBearOnceSet.amountType=='fixed',val=>setBuybackBearOnceSet(updateSetObj(buybackBearOnceSet,val)))}/>
                </RowContentColumn>
                <div>
                    <Checkbox title={t('21063')} checked={buybackSpecialMarketEnabled} onChange={val=>setBuybackSpecialMarketEnabled(val)}/>
                    <RowTip>{t('21064')}</RowTip>
                </div>
                <RowContentColumn>
                    <Select value={buybackSpecialMarketOnceSet.amountType} onChange={val=>setBuybackSpecialMarketOnceSet({...buybackSpecialMarketOnceSet,amountType:val})} options={[{label: t('21036'), value: 'fixed'},{label: t('21037'), value: 'pool_ratio'}]}/>
                    <MyInputNumber value={buybackSpecialMarketOnceSet.amountType=='fixed'?buybackSpecialMarketOnceSet.fixedAmount:showPoolRatio(buybackSpecialMarketOnceSet.poolRatio)} unit={buybackSpecialMarketOnceSet.amountType=='fixed'?"SOL":"%"} onChange={e=>handleChange(e.target.value,buybackSpecialMarketOnceSet.amountType=='fixed',val=>setBuybackSpecialMarketOnceSet(updateSetObj(buybackSpecialMarketOnceSet,val)))}/>
                </RowContentColumn>
                <div>
                    <Checkbox title={t('21061')} checked={buybackOversoldEnabled} onChange={val=>setBuybackOversoldEnabled(val)}/>
                    <RowTip>{t('21065')}</RowTip>
                </div>
                <RowContentColumn>
                    <Select value={buybackOversoldOnceSet.amountType} onChange={val=>setBuybackOversoldOnceSet({...buybackOversoldOnceSet,amountType:val})} options={[{label: t('21036'), value: 'fixed'},{label: t('21037'), value: 'pool_ratio'}]}/>
                    <MyInputNumber value={buybackOversoldOnceSet.amountType=='fixed'?buybackOversoldOnceSet.fixedAmount:showPoolRatio(buybackOversoldOnceSet.poolRatio)} unit={buybackOversoldOnceSet.amountType=='fixed'?"SOL":"%"} onChange={e=>handleChange(e.target.value,buybackOversoldOnceSet.amountType=='fixed',val=>setBuybackOversoldOnceSet(updateSetObj(buybackOversoldOnceSet,val)))}/>
                </RowContentColumn>
            </RowContent>
        </ModalContentH5>}
        <LargeBtn className='custom' onClick={saveBuyback}>{t('21034')}</LargeBtn>
        </>
    }
    const handleCountChange = (newValue, onResult) => {
        if (newValue === '' || /^[1-9]\d*$/.test(newValue)) {
            onResult && onResult(newValue);
        }
    }
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('in_progress');// 'in_progress' | 'completed' | 'closed'
    const [shareRatio, setShareRatio] = useState('');
    const [conditionType, setConditionType] = useState('by_amount');//by_amount | by_address_list
    const [minHolding, setMinHolding] = useState('');
    const [addressList, setAddressList] = useState('');
    const [distributionMethod, setDistributionMethod] = useState('immediate');//immediate | cycle_weekly | cycle_monthly | cycle_quarterly
    const [distriCycleNum, setDistriCycleNum] = useState('');
    const [startTime, setStartTime] = useState(null);
    const refreshDividendsSet = () => {
        if(ctoProjId) {
            dividendRuleQueryApi({ctoProjId}).then(({data})=>{
                if(data.id>0) {
                    setData(data);
                    setStatus(data.status);
                    setShareRatio(data.shareRatio);
                    setConditionType(data.conditionType);
                    setMinHolding(data.minHolding);
                    setAddressList(data.addressList);
                    setDistributionMethod(data.distributionMethod);
                    setDistriCycleNum(data.distriCycleNum);
                    setStartTime(data.startTime?moment.unix(data.startTime):null);
                }
            });
        }
    }
    const saveDividends = () => {
        dividendRuleApi({
            id:0,
            ctoProjId,
            status,
            shareRatio,
            conditionType,
            minHolding,
            addressList,
            distributionMethod,
            distriCycleNum:Number(distriCycleNum),
            startTime:startTime?startTime.unix():'',
        }).then(()=>{
            message.success(t('616'));
            refreshDividendsSet();
        });
    }
    const renderDividends = () => {
        return <>
            {shouldRender?<ModalContentDividends>
                <RowHTitle>{t('309')}</RowHTitle>
                <RowHColumn>
                    <GradientSwitch disabled={status=='completed'} checked={status=='in_progress'} onChange={val=>setStatus(val?'in_progress':'closed')}/>
                </RowHColumn>
                <RowHTitle>{t('21011')}</RowHTitle>
                <InputNumber value={showPoolRatio(shareRatio)} unit="%" onChange={e=>handleChange(e.target.value,false,val=>setShareRatio(val))}/>
                <RowHTitle>{t('21038')}</RowHTitle>
                <RowHColumn>
                    <Radio title={t('21039')} checked={conditionType=='by_amount'} onChange={()=>setConditionType('by_amount')}/>
                    <Radio title={t('21040')} checked={conditionType=='by_address_list'} onChange={()=>setConditionType('by_address_list')}/>
                </RowHColumn>
                <RowInputColumn>
                    <InputNumber value={minHolding} unit="SOL" onChange={e=>handleChange(e.target.value,true,val=>setMinHolding(val))}/>
                    <RowTextarea>
                        <textarea placeholder={t('21041')} value={addressList} onChange={e=>setAddressList(e.target.value)}></textarea>
                    </RowTextarea>
                    <RowEnd>
                        <RowImport onClick={handleImport}>{t('21042')}</RowImport>
                    </RowEnd>
                </RowInputColumn>
                <RowHTitle>{t('21044')}</RowHTitle>
                <RowHColumn>
                    <Radio title={t('21043')} checked={distributionMethod=='immediate'} onChange={()=>setDistributionMethod('immediate')}/>
                    <Radio title={t('21024')} checked={distributionMethod!='immediate'} onChange={()=>setDistributionMethod(data&&data.distributionMethod!='immediate'?data.distributionMethod:'cycle_weekly')}/>
                </RowHColumn>
                <RowInputColumn>
                    {distributionMethod!='immediate'&&<>
                    <RowInputEmpty/>
                    <Row>
                        <Select value={distributionMethod} onChange={val=>setDistributionMethod(val)} options={[{label: t('21069'), value: 'cycle_weekly'},{label: t('21070'), value: 'cycle_monthly'},{label: t('21071'), value: 'cycle_quarterly'}]}/>
                        <InputNumber value={distriCycleNum} unit={t('21077')} onChange={e=>handleCountChange(e.target.value,val=>setDistriCycleNum(val))}/>
                    </Row></>}
                </RowInputColumn>
                <RowHTitle>{t('21009')}</RowHTitle>
                <DatePicker value={startTime} onChange={val=>setStartTime(val)} />
            </ModalContentDividends>
        :<ModalContentH5>
            <RowHTitle>{t('309')}</RowHTitle>
            <RowH5>
                <GradientSwitch disabled={status=='completed'} checked={status=='in_progress'} onChange={val=>setStatus(val?'in_progress':'closed')}/>
            </RowH5>
            <RowHTitle>{t('21011')}</RowHTitle>
            <RowH5>
                <InputNumber value={showPoolRatio(shareRatio)} unit="%" onChange={e=>handleChange(e.target.value,false,val=>setShareRatio(val))}/>
            </RowH5>
            <RowHTitle>{t('21038')}</RowHTitle>
            <RowH5>
                <RowHColumn>
                    <Radio title={t('21039')} checked={conditionType=='by_amount'} onChange={()=>setConditionType('by_amount')}/>
                    <Radio title={t('21040')} checked={conditionType=='by_address_list'} onChange={()=>setConditionType('by_address_list')}/>
                </RowHColumn>
                <RowInputColumn>
                    <InputNumber value={minHolding} unit="SOL" onChange={e=>handleChange(e.target.value,true,val=>setMinHolding(val))}/>
                    <RowEnd>
                        <RowImport onClick={handleImport}>{t('21042')}</RowImport>
                    </RowEnd>
                </RowInputColumn>
                <RowTextarea>
                    <textarea placeholder={t('21041')} value={addressList} onChange={e=>setAddressList(e.target.value)}></textarea>
                </RowTextarea>
            </RowH5>
            <RowHTitle>{t('21044')}</RowHTitle>
            <RowH5>
                <RowHColumn>
                    <Radio title={t('21043')} checked={distributionMethod=='immediate'} onChange={()=>setDistributionMethod('immediate')}/>
                    <Radio title={t('21024')} checked={distributionMethod!='immediate'} onChange={()=>setDistributionMethod(data&&data.distributionMethod!='immediate'?data.distributionMethod:'cycle_weekly')}/>
                </RowHColumn>
                {distributionMethod!='immediate'&&<><RowInputColumn>
                    <RowInputEmpty/>
                    <Select options={[{label: t('21069'), value: ''},{label: t('21070'), value: ''},{label: t('21071'), value: ''}]}/>
                </RowInputColumn>
                <InputNumber value={distriCycleNum} unit={t('21077')} onChange={e=>handleCountChange(e.target.value,val=>setDistriCycleNum(val))}/></>}
            </RowH5>
            <RowHTitle>{t('21009')}</RowHTitle>
            <DatePicker value={startTime} onChange={val=>setStartTime(val)} />
        </ModalContentH5>}
        <LargeBtn className='custom' onClick={saveDividends}>{t('21034')}</LargeBtn>
        </>
    }
    const [destroyStatus, setDestroyStatus] = useState('in_progress');// 'in_progress' | 'completed' | 'closed'
    const [burnRatio, setBurnRatio] = useState('');
    const refreshDestroySet = () => {
        if(ctoProjId) {
            burnSettingQueryApi({ctoProjId}).then(({data})=>{
                if(data.id>0) {
                    setDestroyStatus(data.status);
                    setBurnRatio(data.burnRatio);
                }
            });
        }
    }
    const saveDestroy = () => {
        burnSettingApi({
            id:0,
            ctoProjId,
            status:destroyStatus,
            burnRatio,
        }).then(()=>{
            message.success(t('616'));
            refreshDestroySet();
        });
    }
    const renderDestroy = () => {
        return <>
            {shouldRender?<ModalContentDestroy>
                <RowHTitle>{t('309')}</RowHTitle>
                <RowHColumn>
                    <GradientSwitch disabled={destroyStatus=='completed'} checked={destroyStatus=='in_progress'} onChange={val=>setDestroyStatus(val?'in_progress':'closed')}/>
                </RowHColumn>
                <RowHTitle>{t('21012')}</RowHTitle>
                <InputNumber value={showPoolRatio(burnRatio)} unit="%" onChange={e=>handleChange(e.target.value,false,val=>setBurnRatio(val))}/>
                <RowHTitle>{t('21066')}</RowHTitle>
                <RowHColumn>
                    <Radio title={t('21067')} checked={true} onChange={val=>{}}/>
                </RowHColumn>
            </ModalContentDestroy>
            :<ModalContentH5>
                <RowHTitle>{t('309')}</RowHTitle>
                <RowH5>
                    <GradientSwitch disabled={destroyStatus=='completed'} checked={destroyStatus=='in_progress'} onChange={val=>setDestroyStatus(val?'in_progress':'closed')}/>
                </RowH5>
                <RowHTitle>{t('21012')}</RowHTitle>
                <InputNumber value={showPoolRatio(burnRatio)} unit="%" onChange={e=>handleChange(e.target.value,false,val=>setBurnRatio(val))}/>
                <RowHTitle>{t('21066')}</RowHTitle>
                <RowH5>
                    <RowHColumn>
                        <Radio title={t('21067')} checked={true} onChange={val=>{}}/>
                    </RowHColumn>
                </RowH5>
            </ModalContentH5>}
            <LargeBtn className='custom' onClick={saveDestroy}>{t('21034')}</LargeBtn>
        </>
    }
    return (
        <DialogOverlay
                style={{ height: '100vh', zIndex: 99, background: 'hsla(0, 0%, 0%, 0.6)' }}
                isOpen={show}
                onDismiss={onClose}
            >
            <DialogC aria-label='modal'>
                <ModalHeader>
                    <div className='title'>
                        <ModelTitle className={curIdx==0?'selected':''} onClick={()=>setCurIdx(0)}><span>{t('21045')}</span></ModelTitle>
                        <ModelTitle className={curIdx==1?'selected':''} onClick={()=>setCurIdx(1)}><span>{t('21046')}</span></ModelTitle>
                        <ModelTitle className={curIdx==2?'selected':''} onClick={()=>setCurIdx(2)}><span>{t('21047')}</span></ModelTitle>
                    </div>
                    <img className='close' onClick={onClose} src={require('../../assets/nav/close.png').default}/>
                </ModalHeader>
                {curIdx==0&&renderBuyback()}
                {curIdx==1&&renderDividends()}
                {curIdx==2&&renderDestroy()}
            </DialogC>
        </DialogOverlay>
    )
}

const SmallBtn = styled.button`
width: fit-content;
padding-left: 25px;
padding-right: 25px;
height: 40px;
border-radius: 20px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
font-size: 14px;
font-weight: 600;
display: flex;
align-items: center;
justify-content: center;
img {
margin-left: 10px;
width: 20px;
height: 20px;
}
${({ theme }) => theme.mediaQueries.sm}{
font-size: 18px;
height: 52px;
border-radius: 32px;
padding-left: 55px;
padding-right: 55px;
}
`
const LargeBtn = styled(SmallBtn)`
margin: 0 auto;
margin-top: 28px;
width: 100%;
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 40px;
max-width: 500px;
};
`
const DialogC = styled(DialogContent)`
width: calc(100% - 50px) !important;
padding: 16px 20px 32px !important;
border-radius: 12px !important;
background: #362F42 !important;
margin: 2.5vh auto;
max-height: 95vh;
overflow: auto;
color: ${({ theme }) => theme.colors.text} !important;
${({ theme }) => theme.mediaQueries.sm}{
    width: 750px !important;
    padding: 26px 40px 55px !important;
};
`
const ModalHeader = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 30px;
.title {
font-size: 21px;
font-weight: 600;
line-height: 32px;
display: flex;
align-items: center;
gap: 25px;
}
.close {
cursor: pointer;
width: 17.5px;
height: 17.5px;
}
${({ theme }) => theme.mediaQueries.sm}{
.title {
font-size: 24px;
gap: 32px;
}
};
`
const ModelTitle = styled.div`
position: relative;
cursor: pointer;
font-size: 16px;
opacity: 0.6;
> span {
position: relative;
z-index: 1;
}
&.selected {
opacity: 1;
font-weight: 600;
&:before {
content: '';
position: absolute;
left: 50%;
top: 100%;
width: 90%;
height: 4px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
transform: translate(-50%, -200%);
}
}
${({ theme }) => theme.mediaQueries.sm}{
font-size: 24px;
};
`
const ModalContent = styled.div`
display: grid;
grid-template-columns: auto 1fr;
grid-column-gap: 40px;
grid-row-gap: 25px;
& > :nth-child(1) { grid-area: 1 / 1 / 2 / 2; }
& > :nth-child(2) { grid-area: 1 / 2 / 2 / 3; }
`
const ModalContentH5 = styled.div``
const RowH5 = styled.div`
display: grid;
grid-template-columns: auto 1fr;
grid-column-gap: 20px;
grid-row-gap: 12px;
& > :nth-child(1) { grid-area: 1 / 1 / 2 / 2; }
& > :nth-child(2) { min-width: 100px; grid-area: 1 / 2 / 2 / 3; }
& > :nth-child(3) { grid-area: 2 / 1 / 2 / 3; }
`
const RowTitle = styled.div`
word-break: keep-all;
font-size: 14px;
font-weight: 600;
font-weight: 400;
opacity: 0.4;
&:not(:first-child) {
    margin-top: 20px;
}
${({ theme }) => theme.mediaQueries.sm}{
font-size: 18px;
opacity: 1;
&:not(:first-child) {
    margin-top: 0;
}
}
`
const RowHTitle = styled(RowTitle)`
line-height: 32px;
${({ theme }) => theme.mediaQueries.sm}{
line-height: 40px;
};
`
const RowContent = styled.div`
display: grid;
grid-template-columns: 1fr;
grid-row-gap: 10px;
margin-top: 16px;
`
const RowContentColumn = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-gap: 10px;
`
const RowColumn = styled.div`
display: flex;
flex-direction: column;
gap: 15px;
`
const RowHColumn = styled.div`
display: flex;
flex-direction: column;
gap: 15px;
> div {
height: 32px;
}
${({ theme }) => theme.mediaQueries.sm}{
> div {
height: 40px;
}
};
`
const RowColumnRow = styled.div`
display: flex;
align-items: center;
gap: 12px;
`
const RowColumnGrid = styled.div`
display: grid;
grid-template-columns: auto 1fr;
grid-column-gap: 12px;
grid-row-gap: 12px;
align-items: flex-start;
& > :nth-child(1) { grid-area: 1 / 1 / 2 / 2; }
& > :nth-child(2) { grid-area: 1 / 2 / 2 / 3; }
`
const RowTip = styled.div`
font-size: 12px;
opacity: 0.6;
display: flex;
align-items: center;
margin-left: 20px;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 14px;
margin-left: 0;
height: 24px;
};
`
const RowText = styled.div`
font-size: 14px;
word-break: keep-all;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 16px;
};
`
const MyInputNumber = styled(InputNumber)`
> input {
width: 80px;
}
`
const ModalContentDividends = styled.div`
display: grid;
grid-template-columns: auto auto 1fr 1fr;
grid-column-gap: 20px;
grid-row-gap: 25px;

& > :nth-child(1) { grid-area: 1 / 1 / 2 / 2; }
& > :nth-child(2) { grid-area: 1 / 2 / 2 / 4; }
& > :nth-child(3) { grid-area: 2 / 1 / 2 / 2; }
& > :nth-child(4) { grid-area: 2 / 2 / 2 / 4; }
& > :nth-child(5) { grid-area: 3 / 1 / 3 / 2; }
& > :nth-child(6) { grid-area: 3 / 2 / 3 / 3; }
& > :nth-child(7) { grid-area: 3 / 3 / 3 / 5; }
& > :nth-child(8) { grid-area: 4 / 1 / 4 / 2; }
& > :nth-child(9) { grid-area: 5 / 2 / 4 / 3; }
& > :nth-child(10) { grid-area: 5 / 3 / 4 / 5; }
& > :nth-child(11) { grid-area: 6 / 1 / 5 / 2; }
& > :nth-child(12) { grid-area: 6 / 2 / 5 / 4; }
& > :nth-child(13) { grid-area: 6 / 1 / 6 / 2; }
& > :nth-child(14) { grid-area: 7 / 2 / 6 / 4; }
`
const RowEnd = styled.div`
display: flex;
justify-content: flex-end;
`
const Row = styled.div`
display: flex;
gap: 15px;
align-items: center;
> div {
flex: 1;
}
`
const RowInputColumn = styled.div`
display: flex;
flex-direction: column;
gap: 15px;
`
const RowInputEmpty = styled.div`
height: 32px;
${({ theme }) => theme.mediaQueries.sm}{
height: 40px;
}
`
const RowTextarea = styled.div`
grid-column: span 2;
border-radius: 4px;
background: #121212;
padding: 0 14px;
height: 80px;
display: flex;
align-items: center;
gap: 10px;
textarea {
background: transparent;
border: none;
padding: 10px 0;
resize: none;
flex: 1;
height: 100%;
font-size: 14px;
font-weight: 500;
}
span {
font-size: 13px;
}
${({ theme }) => theme.mediaQueries.sm}{
grid-column: unset;
padding: 0 20px;
height: 102px;
span {
font-size: 14px;
}
};
`
const RowImport = styled.div`
line-height: 32px;
cursor: pointer;
font-size: 12px;
font-weight: 600;
background: linear-gradient(90deg, #8E52F6, #75F6A3);
background-clip: text;
-webkit-text-fill-color: transparent;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 14px;
line-height: unset;
};
`
const ModalContentDestroy = styled.div`
display: grid;
grid-template-columns: auto auto 1fr 1fr;
grid-column-gap: 20px;
grid-row-gap: 25px;

& > :nth-child(1) { grid-area: 1 / 1 / 2 / 2; }
& > :nth-child(2) { grid-area: 1 / 2 / 2 / 4; }
& > :nth-child(3) { grid-area: 2 / 1 / 2 / 2; }
& > :nth-child(4) { grid-area: 2 / 2 / 2 / 4; }
& > :nth-child(5) { grid-area: 3 / 1 / 3 / 2; }
& > :nth-child(6) { grid-area: 3 / 2 / 3 / 3; }
& > :nth-child(7) { grid-area: 3 / 3 / 3 / 5; }
& > :nth-child(8) { grid-area: 4 / 1 / 4 / 2; }
& > :nth-child(9) { grid-area: 5 / 2 / 4 / 4; }
& > :nth-child(10) { grid-area: 6 / 1 / 5 / 2; }
& > :nth-child(11) { grid-area: 6 / 2 / 5 / 4; }
`
