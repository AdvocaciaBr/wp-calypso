/** @format */

/**
 * External dependencies
 */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { localize } from 'i18n-calypso';

export const getCreditCardSummary = ( translate, type, digits ) => {
	const supportedTypes = {
		amex: translate( 'American Express' ),
		discover: translate( 'Discover' ),
		mastercard: translate( 'MasterCard' ),
		visa: translate( 'VISA' ),
		diners: translate( 'Diners Club' ),
		jcb: translate( 'JCB' ),
		unionpay: translate( 'UnionPay' ),
	};

	const displayType = supportedTypes[ type && type.toLowerCase() ] || type;

	if ( ! digits ) {
		return displayType;
	}

	return translate( '%(displayType)s ****%(digits)s', {
		args: { displayType, digits },
	} );
};

export const cardType = PropTypes.shape( {
	stored_details_id: PropTypes.string,
	card: PropTypes.string,
	card_type: PropTypes.string,
	name: PropTypes.string,
	expiry: PropTypes.string,
} );

class StoredCard extends React.Component {
	static propTypes = {
		card: cardType,
	};

	render() {
		var card = this.props.card,
			expirationDate = this.props.moment( card.expiry ).format( 'MM/YY' ),
			cardClasses = classNames( 'stored-card', card.card_type && card.card_type.toLowerCase() );

		return (
			<div className={ cardClasses }>
				<span className="stored-card__number">
					{ getCreditCardSummary( this.props.translate, card.card_type, card.card ) }
				</span>
				<span className="stored-card__name">{ card.name }</span>
				<span className="stored-card__expiration-date">
					{ this.props.translate( 'Expires %(date)s', {
						args: { date: expirationDate },
						context: 'date is of the form MM/YY',
					} ) }
				</span>
			</div>
		);
	}
}

export default localize( StoredCard );