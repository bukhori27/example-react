import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Blazy from "blazy";

import { setSKU } from "@example/wholesale-detail/reducers";
import imgNotFound from "../../assets/icons/icon-no-image.png";
import iconCommercial from '../../assets/images/commercial.png';
import imgPlaceholder from "../../assets/icons/placeholder.png";
import Helper from "@example/helper";
import "./style.scss";

const helper = new Helper();

class CardProduct extends Component {
  constructor() {
    super();
    this.state = {};
    this.fallback = () => {
      if (imgNotFound) {
        this.setState({ failed: true });
      }
    };
  }
  handleSKU = sku => {
    const { setSKU, dispatch, type, item } = this.props;
    setSKU(sku);
    let appVersionCode = document
      .querySelector("meta[name=app_version_code]")
      .getAttribute("content");
    let nameProduct = ''
    if (type) {
      nameProduct = helper.formatTracker("ws_btn_goto_dpp_" + item.name)
      if (parseInt(appVersionCode) > 0) {
        AndroidFunction.logEvent(nameProduct);
      }
      dispatch(push("/wholesale-detail-product-promo"));
    } else {
      nameProduct = helper.formatTracker("ws_btn_goto_dp_" + item.name)
      if (parseInt(appVersionCode) > 0) {
        AndroidFunction.logEvent(nameProduct);
      }
      dispatch(push("/wholesale-detail"));
    }
  };
  onClick (data) {
    this.props.onshowDrawer(data)
  }
  componentDidMount = () => {
    const bLazy = new Blazy({
      error: function(ele, msg) {
        if (msg === "missing" || msg === "invalid")
          ele.setAttribute("src", imgNotFound);
      }
    });
  };
  render() {
    const {
      name,
      price,
      dealPrice,
      image_url,
      hasStatusDeal,
      seller_name
    } = this.props.item;
    return (
      <div
        className="wholesale__product-item"
      >
      <span onClick={() => this.handleSKU(this.props.item)}>
        {dealPrice !== 0 && hasStatusDeal === true && <span className="discount-flag">sale</span>}
        <div className="product-image">
        {/* {this.props.type ?  */}
        {this.state.failed ? <img src={imgNotFound} /> : <img src={image_url} onError={this.fallback} />
      }
          {/* <img
            src={image_url}
            alt={name} onError={this.fallback}
          /> */}
          {/* : <img
            className="b-lazy"
            src={imgPlaceholder}
            data-src={image_url}
            alt={name}
          />
        } */}
        </div>
        <div className="product-supplier">
          <div><img src={iconCommercial} width="24" height="24" /></div>
          <p className="product-supplier-name">{seller_name}</p>
        </div>
        <div className="product-desc">
          <p className="product-desc-title">{helper.formatelipsis(name)}</p>
          {dealPrice !== 0 && hasStatusDeal === true && (
            <span>
              <span className="price-discount">
                {helper.checkFormat(price)}
              </span>
              <span>{helper.checkFormat(dealPrice)}</span>
            </span>
          )}
          {(dealPrice === 0 || hasStatusDeal === false) && (
            <span>{helper.checkFormat(price)}</span>
          )}
        </div>
        </span>
        <div className="wrap-btn-chart">
          <div className="btn-add-cart" onClick={this.onClick.bind(this, this.props.item)}>Tambah Ke Troli</div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSKU: params => {
      dispatch(setSKU(params));
    },
    dispatch
  };
};

CardProduct.propTypes = {
  item: PropTypes.object
};

export default connect(
  null,
  mapDispatchToProps
)(CardProduct);
