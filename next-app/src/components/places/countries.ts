const countries = [
    {
        name: 'Turkey',
        radius: '1000',
        lat: '39.9334',
        lon: '32.8597'
    },
    {
        name: 'United States',
        radius: '3000',
        lat: '37.0902',
        lon: '-95.7129'
    },
    {
        name: 'Canada',
        radius: '3000',
        lat: '56.1304',
        lon: '-106.3468'
    },
    {
        name: 'Brazil',
        radius: '2000',
        lat: '-14.2350',
        lon: '-51.9253'
    },
    {
        name: 'Australia',
        radius: '8000',
        lat: '-25.2744',
        lon: '133.7751'
    },
    {
        name: 'Russia',
        radius: '3000',
        lat: '61.5240',
        lon: '105.3188'
    },
    {
        name: 'China',
        radius: '1500',
        lat: '35.8617',
        lon: '104.1954'
    },
    {
        name: 'Japan',
        radius: '500',
        lat: '36.2048',
        lon: '138.2529'
    },
    {
        name: 'United Kingdom',
        radius: '1000',
        lat: '55.3781',
        lon: '-3.4360'
    },
    {
        name: 'France',
        radius: '1000',
        lat: '46.6034',
        lon: '1.8883'
    },
    {
        name: 'Germany',
        radius: '1000',
        lat: '51.1657',
        lon: '10.4515'
    },
    {
        name: 'Italy',
        radius: '1000',
        lat: '41.8719',
        lon: '12.5674'
    },
    {
        name: 'Spain',
        radius: '1000',
        lat: '40.4637',
        lon: '-3.7492'
    },
    {
        name: 'Netherlands',
        radius: '1000',
        lat: '52.1326',
        lon: '5.2913'
    },
    {
        name: 'Belgium',
        radius: '1000',
        lat: '50.5039',
        lon: '4.4699'
    },
    {
        name: 'Portugal',
        radius: '1000',
        lat: '39.3999',
        lon: '-8.2245'
    },
    {
        name: 'Sweden',
        radius: '1000',
        lat: '60.1282',
        lon: '18.6435'
    },
    {
        name: 'Norway',
        radius: '1000',
        lat: '60.4720',
        lon: '8.4689'
    },
    {
        name: 'Denmark',
        radius: '1000',
        lat: '56.2639',
        lon: '9.5018'
    },
    {
        name: 'Finland',
        radius: '1000',
        lat: '61.9241',
        lon: '25.7482'
    },
    {
        name: 'Poland',
        radius: '1000',
        lat: '51.9194',
        lon: '19.1451'
    },
    {
        name: 'Ukraine',
        radius: '1000',
        lat: '48.3794',
        lon: '31.1656'
    },
    {
        name: 'Greece',
        radius: '1000',
        lat: '39.0742',
        lon: '21.8243'
    },
    {
        name: 'Ireland',
        radius: '1000',
        lat: '53.1424',
        lon: '-7.6921'
    },
    {
        name: 'Austria',
        radius: '1000',
        lat: '47.5162',
        lon: '14.5501'
    },
    {
        name: 'Switzerland',
        radius: '1000',
        lat: '46.8182',
        lon: '8.2275'
    },
    {
        name: 'Czech Republic',
        radius: '1000',
        lat: '49.8175',
        lon: '15.4729'
    },
    {
        name: 'Romania',
        radius: '1000',
        lat: '45.9432',
        lon: '24.9668'
    },
    {
        name: 'Hungary',
        radius: '1000',
        lat: '47.1625',
        lon: '19.5033'
    },
    {
        name: 'Bulgaria',
        radius: '1000',
        lat: '42.7339',
        lon: '25.4858'
    },
    {
        name: 'Slovakia',
        radius: '1000',
        lat: '48.6690',
        lon: '19.6990'
    },
    {
        name: 'Croatia',
        radius: '1000',
        lat: '45.1000',
        lon: '15.2000'
    },
    {
        name: 'Slovenia',
        radius: '1000',
        lat: '46.1512',
        lon: '14.9955'
    },
    {
        name: 'Serbia',
        radius: '1000',
        lat: '44.0165',
        lon: '21.0059'
    },
    {
        name: 'Bosnia and Herzegovina',
        radius: '1000',
        lat: '43.9159',
        lon: '17.6791'
    },
    {
        name: 'Montenegro',
        radius: '1000',
        lat: '42.7087',
        lon: '19.3744'
    },
    {
        name: 'Albania',
        radius: '1000',
        lat: '41.1533',
        lon: '20.1683'
    },
    {
        name: 'North Macedonia',
        radius: '1000',
        lat: '41.6086',
        lon: '21.7453'
    },
    {
        name: 'Kosovo',
        radius: '1000',
        lat: '42.6026',
        lon: '20.9029'
    },
    {
        name: 'Cyprus',
        radius: '1000',
        lat: '35.1264',
        lon: '33.4299'
    },
    {
        name: 'Estonia',
        radius: '1000',
        lat: '58.5953',
        lon: '25.0136'
    },
    {
        name: 'Latvia',
        radius: '1000',
        lat: '56.8796',
        lon: '24.6032'
    },
    {
        name: 'Lithuania',
        radius: '1000',
        lat: '55.1694',
        lon: '23.8813'
    },
    {
        name: 'Malta',
        radius: '1000',
        lat: '35.9375',
        lon: '14.3754'
    },
    {
        name: 'Syria',
        radius: '1000',
        lat: '34.8021',
        lon: '38.9968'
    },
    {
        name: 'Lebanon',
        radius: '1000',
        lat: '33.8547',
        lon: '35.8623'
    },
    {
        name: 'Palestine',
        radius: '1000',
        lat: '31.9522',
        lon: '35.2332'
    },
    {
        name: 'Jordan',
        radius: '1000',
        lat: '30.5852',
        lon: '36.2384'
    },
    {
        name: 'Iraq',
        radius: '1000',
        lat: '33.2232',
        lon: '43.6793'
    },
    {
        name: 'Iran',
        radius: '1000',
        lat: '32.4279',
        lon: '53.6880'
    },
    {
        name: 'Saudi Arabia',
        radius: '1000',
        lat: '23.8859',
        lon: '45.0792'
    },
    {
        name: 'Yemen',
        radius: '1000',
        lat: '15.5527',
        lon: '48.5164'
    },
    {
        name: 'Oman',
        radius: '1000',
        lat: '21.4735',
        lon: '55.9754'
    },
    {
        name: 'United Arab Emirates',
        radius: '1000',
        lat: '23.4241',
        lon: '53.8478'
    },
    {
        name: 'Qatar',
        radius: '1000',
        lat: '25.3548',
        lon: '51.1839'
    },
    {
        name: 'Kuwait',
        radius: '1000',
        lat: '29.3117',
        lon: '47.4818'
    },
    {
        name: 'Bahrain',
        radius: '1000',
        lat: '26.0667',
        lon: '50.5577'
    },
    {
        name: 'Egypt',
        radius: '1000',
        lat: '26.8206',
        lon: '30.8025'
    },
    {
        name: 'Libya',
        radius: '1000',
        lat: '26.3351',
        lon: '17.2283'
    },
    {
        name: 'Tunisia',
        radius: '1000',
        lat: '33.8869',
        lon: '9.5375'
    },
    {
        name: 'Algeria',
        radius: '1000',
        lat: '28.0339',
        lon: '1.6596'
    },
    {
        name: 'Morocco',
        radius: '1000',
        lat: '31.7917',
        lon: '7.0926'
    },
    {
        name: 'Western Sahara',
        radius: '1000',
        lat: '24.2155',
        lon: '13.6786'
    },
    {
        name: 'Mauritania',
        radius: '1000',
        lat: '21.0079',
        lon: '10.9408'
    },
    {
        name: 'Mali',
        radius: '1000',
        lat: '17.5707',
        lon: '-3.9962'
    },
    {
        name: 'Niger',
        radius: '1000',
        lat: '17.6078',
        lon: '8.0817'
    },
    {
        name: 'Chad',
        radius: '1000',
        lat: '15.4542',
        lon: '18.7322'
    },
    {
        name: 'Sudan',
        radius: '1000',
        lat: '12.8628',
        lon: '30.2176'
    },
    {
        name: 'South Sudan',
        radius: '1000',
        lat: '6.8770',
        lon: '31.3070'
    },
    {
        name: 'Eritrea',
        radius: '1000',
        lat: '15.1794',
        lon: '39.7823'
    },
    {
        name: 'Djibouti',
        radius: '1000',
        lat: '11.8251',
        lon: '42.5903'
    },
    {
        name: 'Somalia',
        radius: '1000',
        lat: '5.1521',
        lon: '46.1996'
    },
    {
        name: 'Ethiopia',
        radius: '1000',
        lat: '9.1450',
        lon: '40.4897'
    },
    {
        name: 'Kenya',
        radius: '1000',
        lat: '1.2921',
        lon: '36.8219'
    },
    {
        name: 'Uganda',
        radius: '1000',
        lat: '1.3733',
        lon: '32.2903'
    },
    {
        name: 'Rwanda',
        radius: '1000',
        lat: '-1.9403',
        lon: '29.8739'
    },
    {
        name: 'Burundi',
        radius: '1000',
        lat: '-3.3731',
        lon: '29.9189'

    },
    {
        name: 'Tanzania',
        radius: '1000',
        lat: '-6.3690',
        lon: '34.8888'

    },
    {
        name: 'Democratic Republic of the Congo',
        radius: '1000',
        lat: '-4.0383',
        lon: '21.7587'
    },
    {
        name: 'Angola',
        radius: '1000',
        lat: '-11.2027',
        lon: '17.8739'
    },
    {
        name: 'Zambia',
        radius: '1000',
        lat: '-13.1339',
        lon: '27.8493'
    },
    {
        name: 'Zimbabwe',
        radius: '1000',
        lat: '-19.0154',
        lon: '29.1549'
    },
    {
        name: 'Namibia',
        radius: '1000',
        lat: '-22.9576',
        lon: '18.4904'
    },
    {
        name: 'Botswana',
        radius: '1000',
        lat: '-22.3285',
        lon: '24.6849'
    },
    {
        name: 'South Africa',
        radius: '1000',
        lat: '-30.5595',
        lon: '22.9375'
    },
    {
        name: 'India',
        radius: '1000',
        lat: '20.5937',
        lon: '78.9629'
    },
    {
        name: 'Pakistan',
        radius: '1000',
        lat: '30.3753',
        lon: '69.3451'
    },
    {
        name: 'Afghanistan',
        radius: '1000',
        lat: '33.9391',
        lon: '67.7100'

    },
];

export default countries;
