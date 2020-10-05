import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Col, Row, message } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { goToPromo } from "@example/wholesale-home/reducers";
import Helper from "@example/helper";
import "./style.scss";

const helper = new Helper();

class CardPromo extends React.Component {
  handleClick(item) {
    const { dispatch } = this.props;
    dispatch(goToPromo(item));
  }
  handleShow(text, index) {
    if (index === 1) {
      message.success(text, 3);
      message.config({
        maxCount: 1
      });
    }
  }
  render() {
    const { data, type } = this.props;
    return (
      <>
        <div className="card__promo-group">
          <div className="card__promo-item">
            {type === "list" && (
              <img src={data.image} onClick={this.handleClick.bind(this, data)} className="card__promo-item-img-list"/>
            )}
            {type === "detail" && <img src={data.image} className="card__promo-item-img-detail"/>}
          </div>
        </div>
        {data.type !== 0 &&
          <Row className="card__promo-item-content">
            <Col span={24}>
            {type === "list" && 
              <Col span={16} onClick={this.handleClick.bind(this, data)}>
                <Col span={24}>
                  {data.coupon_code ? (
                    <>
                      <span className="card__promo-item-content-kode">
                        Kode Promo :   
                      </span>
                      <span className="card__promo-item-content-bold">
                        {data.coupon_code}
                      </span>
                    </>
                  ) : (
                    <span> {data.name} </span>
                  )}
                </Col>
                {data.start_date &&
                  <Col span={24}>
                    <div className="card__promo-item-content-date">
                      <p>{helper.changeNumber(data.start_date)} {helper.changeMonth(data.start_date)} - {helper.changeNumber(data.end_date)} {helper.changeMonth(data.end_date)} {helper.changeYear(data.end_date)}</p>
                    </div>
                  </Col>
                }
              </Col>
            }
            {type === "detail" &&
              <Col span={16}>
                <Col span={24}>
                  {data.coupon_code ? (
                    <>
                      <span className="card__promo-item-content-kode">
                        Kode Promo :   
                      </span>
                      <span className="card__promo-item-content-bold">
                        {data.coupon_code}
                      </span>
                    </>
                  ) : (
                    <span> {data.name} </span>
                  )}
                </Col>
                {data.start_date &&
                  <Col span={24}>
                    <div className="card__promo-item-content-date">
                      <p>{helper.changeNumber(data.start_date)} {helper.changeMonth(data.start_date)} - {helper.changeNumber(data.end_date)} {helper.changeMonth(data.end_date)} {helper.changeYear(data.end_date)}</p>
                    </div>
                  </Col>
                }
              </Col>
            }
              <Col span={8} className="text-right">
                {data.coupon_code && (
                  <CopyToClipboard
                    text={data.coupon_code}
                    onCopy={() => this.handleShow("Kode Berhasil di Salin", 1)}
                  >
                    <button className="copy-promo">salin kode</button>
                  </CopyToClipboard>
                )}
              </Col>
            </Col>
          </Row>
        }
        {data.type === 0 &&
          <div className="card__promo-item-contentType0">
          </div>
        }
      </>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};
CardPromo.propTypes = {
  data: PropTypes.object
};

export default connect(
  null,
  mapDispatchToProps
)(CardPromo);
