import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import storage from "@example/storage-local";
import { Row, Col } from "antd";
import Blazy from "blazy";
import {
  serviceFilterProduct,
  getProductCategory
} from "@example/wholesale-product/reducers";

import "./style.scss";
import Helper from "@example/helper";

import imgNotFound from "../../assets/icons/icon-no-image.png";
import imgPlaceholder from "../../assets/icons/placeholder.png";

const Storage = new storage();
const helper = new Helper();
class GridList extends Component {
  handleGoTo = (id, name, type) => {
    const { serviceFilterProduct, getProductCategory } = this.props;
    let appVersionCode = document
      .querySelector("meta[name=app_version_code]")
      .getAttribute("content");
      let category_name = helper.formatTracker("ws_" + type +"_btn_lp_"+name)
    if (parseInt(appVersionCode) > 0) {
      AndroidFunction.logEvent(category_name);
      AndroidFunction.logEvent("ws_" + type + "_category_btn_lp");
    }
    getProductCategory({ id: id, name: name });
    let category_product = {
      id: id
    };
    // Storage.setData('category_product', JSON.stringify(category_product));
    serviceFilterProduct({ category_id: id });
  };
  componentDidMount = () => {
    const bLazy = new Blazy({
      error: function(ele, msg) {
        if (msg === "missing" || msg === "invalid")
          ele.setAttribute("src", imgNotFound);
      }
    });
  };
  componentWillUpdate = () => {
    const bLazy = new Blazy({
      error: function(ele, msg) {
        if (msg === "missing" || msg === "invalid")
          ele.setAttribute("src", imgNotFound);
      }
    });
  };
  render() {
    const { data, style, serviceFilterProduct, type } = this.props;
    return (
      <Row>
        <Col span={24} style={style}>
          {data.map(({ id, image_url, name }, index) => {
            return (
              <Col span={8} key={index}>
                <Link
                  className="grid__list-item"
                  to="/wholesale-product"
                  onClick={() => this.handleGoTo(id, name, type)}
                >
                  <img
                    className="b-lazy"
                    src={imgPlaceholder}
                    data-src={image_url}
                    alt={name}
                  />
                  <span>{name}</span>
                </Link>
              </Col>
            );
          })}
        </Col>
      </Row>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    serviceFilterProduct: params => {
      dispatch(serviceFilterProduct(params));
    },
    getProductCategory: params => {
      dispatch(getProductCategory(params));
    }
  };
};

GridList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      image_url: PropTypes.string,
      name: PropTypes.string
    })
  )
};

export default connect(
  null,
  mapDispatchToProps
)(GridList);
