declare type ContactType = 'Person' | 'Organization';

/**
 * The base structure of a recipient. You should use either `NewRecipient` or 
 * `ContactRecipient` and not this interface directly.
 */
declare interface BaseRecipient {
    /**
     * Name of the recipient. This field is required
     */
    name: string;

    /**
     * Email of the recipient. 
     * This field is optional, but the recipient should at least contain one
     * form of contact information (either email, address or phone number).
     */
    email?: string;

    /**
     * Address of the recipient. 
     * This field is optional, but the recipient should at least contain one
     * form of contact information (either email, address or phone number).
     */
    address?: string;
    postalCode?: string;
    /** Norwegian: `Poststed` */ city?: string;

    attention?: string;
    reference?: string;

    /**
     * Phone number of the recipient. 
     * This field is optional, but the recipient should at least contain one
     * form of contact information (either email, address or phone number).
     */
    phoneNumber?: string;

    /** 
     * Norwegian: `offentlignummer`. 
     * This should be the VAT identifier (organisasjonsnummer) for an 
     * organization, or the SSN (personnummer) for a person
     */
    publicIdentifier?: string;

    /**
     * This should be the ISO country code if it is filled
     */
    countryCode?: string;
}

/**
 * Use this structure if you are searching through the contact registry of the 
 * Websak database. You must copy all the applicable fields from the contact
 * registry into the recipient type so that we get a snapshot of the contact
 * information at the time this contact was added as a recipient.
 */
declare interface ContactRecipient extends BaseRecipient {
    /** Id of the contact (GID id) */
    id: number;
}

/**
 * Use this structure if the recipient is created by the user or from an
 * external source.
 */
declare interface NewRecipient extends BaseRecipient {
    /**
     * If this reciepient is an organization or a person. The default value is
     * that the recipient is a person 
     */
    type?: ContactType;

    /**
     * If true, we will save the recipient in the contact registry
     */
    saveContact: boolean;
}

declare type Recipient = NewRecipient | ContactRecipient;