import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserReview } from '@example/wholesale-review/reducers';
import './style.scss';
import iconLocation from '../assets/icons/map.png';

class WholesaleReviewAddress extends Component {
    componentWillMount() {
        const { getUserReview } = this.props;
        // getUserReview({});                
    }  
    render() {  
        const titleAddress = 'Alamat Pengiriman';
        const { user } = this.props;  
        return (
            <div className="wholesale__address">
                <div>
                    <img src={iconLocation} />
                </div>
                <div>
                    <span>{titleAddress}</span>
                        <p>{user.address}</p>      
                </div>
            </div>    
        );
    }
}

const mapStateToProps = ({ wholesaleReview }) => {
    return {
        user: wholesaleReview.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserReview: () => {            
            dispatch(getUserReview())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WholesaleReviewAddress);