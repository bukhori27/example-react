import React from 'react';
import { connect } from 'react-redux';
import './style.scss';
import { Col, Row, Form, Radio, Modal } from 'antd';
import { withRouter } from 'react-router-dom'
import Helper from '@example/helper';
import { setDateShipping, setTimeShipping, setDateTimeShipping } from '@example/wholesale-review/reducers';

const mapDispatchToProps = (dispatch) => {
    return {
        'setDateShipping': (item) => {
            dispatch(setDateShipping(item))
        },
        'setTimeShipping': (item) => {
            dispatch(setTimeShipping(item))
        },
        dispatch: dispatch
    }
}
const mapStateToProps = ({  wholesaleReview }) => {  
    return { 
        datevalue: wholesaleReview.date,
        timevalue: wholesaleReview.time,
        dateTime: wholesaleReview.dateTime,
    }
}
const helper = new Helper;
const time = [
    {
        id: 1,
        time: '10.00-12.00'
    },
    {
        id: 2,
        time: '13.00-15.00'
    },
    {
        id: 3,
        time: '15.00-18.00'
    }
]

let Datadate = ''
let visibleModal = false
class WholesaleReviewTimeReceipt extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            visibleModal: false
        };
    }
    componentWillMount() {
        const {dispatch} = this.props
        const date = Date.now();
        helper.setCurrentDate(date);
        helper.handle(function(listRangeDays) {
            Datadate = listRangeDays
        });
        dispatch(setDateTimeShipping(false))
    }
    componentWillUpdate (nextprops) {
        if (nextprops.dateTime ){
            if ((nextprops.datevalue === '' && nextprops.timevalue !== '') || (nextprops.datevalue !== '' && nextprops.timevalue === '')) {
                this.modal()
            }
        }
    }
    onChangeDate(e) {
        const {setDateShipping, dispatch} = this.props
        setDateShipping(e.target.value)
        let appVersionCode = document.querySelector('meta[name=app_version_code]').getAttribute( 'content' );
        if (parseInt(appVersionCode)> 0)  {
            AndroidFunction.logEvent("ws_review_button_choice_date");
        } 
        dispatch(setDateTimeShipping(false))
    }
    onChangeTime(e) {
        const {setTimeShipping, dispatch} = this.props
        setTimeShipping(e.target.value)
        let appVersionCode = document.querySelector('meta[name=app_version_code]').getAttribute( 'content' );
        if (parseInt(appVersionCode)> 0)  {
            AndroidFunction.logEvent("ws_review_button_choice_time");
        }  
        dispatch(setDateTimeShipping(false))
    }
    modal () {
        Modal.info({
            title: 'Perhatian',
            okText: 'Oke',
            style:{ top: 20 },
            content: (
              <div>
                <p>Tanggal dan jam penerimaan barang belum Anda isi</p>
              </div>
            ),
            onOk() {},
        });
        return (
            <span>Waktu penerimaan belum di pilih</span> 
        )
    }
    render () {
        const {datevalue, timevalue} = this.props
        return (
            <div className="wholesale-review-time-receipt">
                <div className="wholesale-review-time-receipt-wrap">
                    <div className="wholesale-review-time-receipt-title">Tentukan Waktu Penerimaan Barang</div>
                    <Row>   
                        <div className="wholesale-review-time-receipt-subtitle">Pilih Tanggal:</div>
                        <Radio.Group defaultValue={datevalue}>
                            {Datadate.map((item, index) =>
                                <Radio.Button onChange={this.onChangeDate.bind(this)} value={item} className={`wholesale-review-time-receipt-date ${helper.checkDayOff(item) === true? 'disable':''}`} key={index}>
                                    <span className="time-receipt-month">{helper.changeMonth(item)}</span>
                                    <span className="time-receipt-number">{helper.changeNumber(item)}</span>
                                    <span className="time-receipt-day">{helper.changeDay(item)}</span>
                                </Radio.Button>
                            )}
                        </Radio.Group>
                    </Row>
                    <Row>
                        <div className="wholesale-review-time-receipt-subtitle">Pilih Jam:</div>
                        <Radio.Group defaultValue={timevalue}>
                            {time.map((time, index) =>
                                <Col span={8} className="text-center" key={index}>
                                    <Radio.Button onChange={this.onChangeTime.bind(this)} value={time.time} className="wholesale-review-time-receipt-hour">
                                        {time.time}
                                    </Radio.Button>
                                </Col>
                            )}
                        </Radio.Group>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Form.create({})(withRouter(connect(mapStateToProps,mapDispatchToProps)(WholesaleReviewTimeReceipt)))