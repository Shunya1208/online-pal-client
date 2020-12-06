import getAge from "get-age"
const isoCountries = {
    'Afghanistan': 'AF',
    'Aland Islands': 'AX',
    'Albania': 'AL',
    'Algeria': 'DZ',
    'American Samoa': 'AS',
    'Andorra': 'AD',
    'Angola': 'AO',
    'Anguilla': 'AI',
    'Antarctica': 'AQ' ,
    'Antigua And Barbuda':'AG',
    'Argentina': 'AR',
    'Armenia': 'AM' ,
    'Aruba': 'AW',
    'Australia': 'AU',
    'Austria': 'AT',
    'Azerbaijan': 'AZ',
    'Bahamas': 'BS',
    'Bahrain': 'BH',
    'Bangladesh': 'BD',
    'Barbados': 'BB',
    'Belarus': 'BY',
    'Belgium': 'BE',
    'Belize': 'BZ',
    'Benin': 'BJ',
    'Bermuda': 'BM',
    'Bhutan': 'BT',
    'Bolivia': 'BO',
    'Bosnia And Herzegovina': 'BA',
    'Botswana': 'BW',
    'Bouvet Island': 'BV',
    'Brazil': 'BR',
    'British Indian Ocean Territory': 'IO',
    'Brunei Darussalam': 'BN',
    'Bulgaria': 'BG',
    'Burkina Faso': 'BF',
    'Burundi': 'BI',
    'Cambodia': 'KH',
    'Cameroon': 'CM',
    'Canada': 'CA',
    'Cape Verde': 'CV',
    'Cayman Islands': 'KY',
    'Central African Republic': 'CF',
    'Chad': 'TD',
    'Chile': 'CL',
    'China': 'CN',
    'Christmas Island': 'CX',
    'Cocos (Keeling) Islands': 'CC',
    'Colombia': 'CO',
    'Comoros': 'KM',
    'Congo': 'CG',
    'Congo, Democratic Republic': 'CD',
    'Cook Islands': 'CK',
    'Costa Rica': 'CR',
    'Cote D\'Ivoire': 'CI',
    'Croatia': 'HR',
    'Cuba': 'CU',
    'Cyprus': 'CY',
    'Czech Republic': 'CZ',
    'Denmark': 'DK',
    'Djibouti': 'DJ',
    'Dominica': 'DM',
    'Dominican Republic': 'DO',
    'Ecuador': 'EC',
    'Egypt': 'EG',
    'El Salvador': 'SV',
    'Equatorial Guinea': 'GQ',
    'Eritrea': 'ER',
    'Estonia': 'EE',
    'Ethiopia': 'ET',
    'Falkland Islands (Malvinas)': 'FK',
    'Faroe Islands': 'FO',
    'Fiji': 'FJ',
    'Finland': 'FI',
    'France': 'FR',
    'French Guiana': 'GF',
    'French Polynesia': 'PF',
    'French Southern Territories': 'TF',
    'Gabon': 'GA',
    'Gambia': 'GM',
    'Georgia': 'GE',
    'Germany': 'DE',
    'Ghana': 'GH',
    'Gibraltar': 'GI',
    'Greece': 'GR',
    'Greenland': 'GL',
    'Grenada': 'GD',
    'Guadeloupe': 'GP',
    'Guam': 'GU',
    'Guatemala': 'GT',
    'Guernsey': 'GG',
    'Guinea': 'GN',
    'Guinea-Bissau': 'GW',
    'Guyana': 'GY',
    'Haiti': 'HT',
    'Heard Island & Mcdonald Islands': 'HM',
    'Holy See (Vatican City State)': 'VA',
    'Honduras': 'HN',
    'Hong Kong': 'HK',
    'Hungary': 'HU',
    'Iceland': 'IS',
    'India': 'IN',
    'Indonesia': 'ID',
    'Iran, Islamic Republic Of': 'IR',
    'Iraq': 'IQ',
    'Ireland': 'IE',
    'Isle Of Man': 'IM',
    'Israel': 'IL',
    'Italy': 'IT',
    'Jamaica': 'JM',
    'Japan': 'JP',
    'Jersey': 'JE',
    'Jordan': 'JO',
    'Kazakhstan': 'KZ',
    'Kenya': 'KE',
    'Kiribati': 'KI',
    'Korea': 'KR',
    'Kuwait': 'KW',
    'Kyrgyzstan': 'KG',
    'Lao People\'s Democratic Republic': 'LA',
    'Latvia': 'LV',
    'Lebanon': 'LB',
    'Lesotho': 'LS',
    'Liberia': 'LR',
    'Libyan Arab Jamahiriya': 'LY',
    'Liechtenstein': 'LI',
    'Lithuania': 'LT',
    'Luxembourg': 'LU',
    'Macao': 'MO',
    'Macedonia': 'MK',
    'Madagascar': 'MG',
    'Malawi': 'MW',
    'Malaysia': 'MY',
    'Maldives': 'MV',
    'Mali': 'ML',
    'Malta': 'MT',
    'Marshall Islands': 'MH',
    'Martinique':  'MQ',
    'Mauritania': 'MR',
    'Mauritius': 'MU',
    'Mayotte': 'YT',
    'Mexico': 'MX',
    'Micronesia, Federated States Of': 'FM',
    'Moldova': 'MD',
    'Monaco': 'MC',
    'Mongolia': 'MN',
    'Montenegro': 'ME',
    'Montserrat': 'MS',
    'Morocco': 'MA',
    'Mozambique': 'MZ',
    'Myanmar': 'MM',
    'Namibia': 'NA',
    'Nauru': 'NR',
    'Nepal': 'NP',
    'Netherlands': 'NL',
    'Netherlands Antilles': 'AN',
    'New Caledonia': 'NC',
    'New Zealand': 'NZ',
    'Nicaragua': 'NI',
    'Niger': 'NE',
    'Nigeria': 'NG',
    'Niue': 'NU',
    'Norfolk Island':'NF',
    'Northern Mariana Islands': 'MP',
    'Norway': 'NO',
    'Oman': 'OM',
    'Pakistan': 'PK',
    'Palau': 'PW',
    'Palestinian Territory, Occupied': 'PS',
    'Panama': 'PA',
    'Papua New Guinea': 'PG',
    'Paraguay': 'PY',
    'Peru': 'PE',
    'Philippines': 'PH',
    'Pitcairn': 'PN',
    'Poland': 'PL',
    'Portugal': 'PT',
    'Puerto Rico': 'PR',
    'Qatar': 'QA',
    'Reunion': 'RE',
    'Romania': 'RO',
    'Russia': 'RU',
    'Rwanda': 'RW',
    'Saint Barthelemy': 'BL',
    'Saint Helena': 'SH',
    'Saint Kitts And Nevis': 'KN',
    'Saint Lucia': 'LC',
    'Saint Martin': 'MF',
    'Saint Pierre And Miquelon': 'PM',
    'Saint Vincent And Grenadines': 'VC',
    'Samoa': 'WS',
    'San Marino': 'SM',
    'Sao Tome And Principe': 'ST',
    'Saudi Arabia': 'SA',
    'Senegal': 'SN',
    'Serbia': 'RS',
    'Seychelles': 'SC',
    'Sierra Leone': 'SL',
    'Singapore': 'SG',
    'Slovakia': 'SK',
    'Slovenia': 'SI',
    'Solomon Islands': 'SB',
    'Somalia': 'SO',
    'South Africa': 'ZA',
    'South Georgia And Sandwich Isl.': 'GS',
    'Spain': 'ES',
    'Sri Lanka': 'LK',
    'Sudan': 'SD',
    'Suriname': 'SR',
    'Svalbard And Jan Mayen': 'SJ',
    'Swaziland': 'SZ',
    'Sweden': 'SE',
    'Switzerland': 'CH',
    'Syrian Arab Republic': 'SY',
    'Taiwan': 'TW',
    'Tajikistan': 'TJ',
    'Tanzania': 'TZ',
    'Thailand': 'TH',
    'Timor-Leste': 'TL',
    'Togo': 'TG',
    'Tokelau': 'TK',
    'Tonga': 'TO',
    'Trinidad And Tobago': 'TT',
    'Tunisia': 'TN',
    'Turkey': 'TR',
    'Turkmenistan': 'TM',
    'Turks And Caicos Islands': 'TC',
    'Tuvalu': 'TV',
    'Uganda': 'UG',
    'Ukraine': 'UA',
    'United Arab Emirates': 'AE',
    'United Kingdom': 'GB',
    'United States': 'US',
    'United States Outlying Islands': 'UM',
    'Uruguay': 'UY',
    'Uzbekistan': 'UZ',
    'Vanuatu': 'VU',
    'Venezuela': 'VE',
    'Viet Nam': 'VN',
    'Virgin Islands, British': 'VG',
    'Virgin Islands, U.S.': 'VI',
    'Wallis And Futuna': 'WF',
    'Western Sahara': 'EH',
    'Yemen': 'YE',
    'Zambia': 'ZM',
    'Zimbabwe': 'ZW'
};

const countryLocation = {
    "ad": {
        "lat": "42.5000",
        "long": "1.5000"
    },
    "ae": {
        "lat": "24.0000",
        "long": "54.0000"
    },
    "af": {
        "lat": "33.0000",
        "long": "65.0000"
    },
    "ag": {
        "lat": "17.0500",
        "long": "-61.8000"
    },
    "ai": {
        "lat": "18.2500",
        "long": "-63.1667"
    },
    "al": {
        "lat": "41.0000",
        "long": "20.0000"
    },
    "am": {
        "lat": "40.0000",
        "long": "45.0000"
    },
    "an": {
        "lat": "12.2500",
        "long": "-68.7500"
    },
    "ao": {
        "lat": "-12.5000",
        "long": "18.5000"
    },
    "ap": {
        "lat": "35.0000",
        "long": "105.0000"
    },
    "aq": {
        "lat": "-90.0000",
        "long": "0.0000"
    },
    "ar": {
        "lat": "-34.0000",
        "long": "-64.0000"
    },
    "as": {
        "lat": "-14.3333",
        "long": "-170.0000"
    },
    "at": {
        "lat": "47.3333",
        "long": "13.3333"
    },
    "au": {
        "lat": "-27.0000",
        "long": "133.0000"
    },
    "aw": {
        "lat": "12.5000",
        "long": "-69.9667"
    },
    "az": {
        "lat": "40.5000",
        "long": "47.5000"
    },
    "ba": {
        "lat": "44.0000",
        "long": "18.0000"
    },
    "bb": {
        "lat": "13.1667",
        "long": "-59.5333"
    },
    "bd": {
        "lat": "24.0000",
        "long": "90.0000"
    },
    "be": {
        "lat": "50.8333",
        "long": "4.0000"
    },
    "bf": {
        "lat": "13.0000",
        "long": "-2.0000"
    },
    "bg": {
        "lat": "43.0000",
        "long": "25.0000"
    },
    "bh": {
        "lat": "26.0000",
        "long": "50.5500"
    },
    "bi": {
        "lat": "-3.5000",
        "long": "30.0000"
    },
    "bj": {
        "lat": "9.5000",
        "long": "2.2500"
    },
    "bm": {
        "lat": "32.3333",
        "long": "-64.7500"
    },
    "bn": {
        "lat": "4.5000",
        "long": "114.6667"
    },
    "bo": {
        "lat": "-17.0000",
        "long": "-65.0000"
    },
    "br": {
        "lat": "-10.0000",
        "long": "-55.0000"
    },
    "bs": {
        "lat": "24.2500",
        "long": "-76.0000"
    },
    "bt": {
        "lat": "27.5000",
        "long": "90.5000"
    },
    "bv": {
        "lat": "-54.4333",
        "long": "3.4000"
    },
    "bw": {
        "lat": "-22.0000",
        "long": "24.0000"
    },
    "by": {
        "lat": "53.0000",
        "long": "28.0000"
    },
    "bz": {
        "lat": "17.2500",
        "long": "-88.7500"
    },
    "ca": {
        "lat": "60.0000",
        "long": "-95.0000"
    },
    "cc": {
        "lat": "-12.5000",
        "long": "96.8333"
    },
    "cd": {
        "lat": "0.0000",
        "long": "25.0000"
    },
    "cf": {
        "lat": "7.0000",
        "long": "21.0000"
    },
    "cg": {
        "lat": "-1.0000",
        "long": "15.0000"
    },
    "ch": {
        "lat": "47.0000",
        "long": "8.0000"
    },
    "ci": {
        "lat": "8.0000",
        "long": "-5.0000"
    },
    "ck": {
        "lat": "-21.2333",
        "long": "-159.7667"
    },
    "cl": {
        "lat": "-30.0000",
        "long": "-71.0000"
    },
    "cm": {
        "lat": "6.0000",
        "long": "12.0000"
    },
    "cn": {
        "lat": "35.0000",
        "long": "105.0000"
    },
    "co": {
        "lat": "4.0000",
        "long": "-72.0000"
    },
    "cr": {
        "lat": "10.0000",
        "long": "-84.0000"
    },
    "cu": {
        "lat": "21.5000",
        "long": "-80.0000"
    },
    "cv": {
        "lat": "16.0000",
        "long": "-24.0000"
    },
    "cx": {
        "lat": "-10.5000",
        "long": "105.6667"
    },
    "cy": {
        "lat": "35.0000",
        "long": "33.0000"
    },
    "cz": {
        "lat": "49.7500",
        "long": "15.5000"
    },
    "de": {
        "lat": "51.0000",
        "long": "9.0000"
    },
    "dj": {
        "lat": "11.5000",
        "long": "43.0000"
    },
    "dk": {
        "lat": "56.0000",
        "long": "10.0000"
    },
    "dm": {
        "lat": "15.4167",
        "long": "-61.3333"
    },
    "do": {
        "lat": "19.0000",
        "long": "-70.6667"
    },
    "dz": {
        "lat": "28.0000",
        "long": "3.0000"
    },
    "ec": {
        "lat": "-2.0000",
        "long": "-77.5000"
    },
    "ee": {
        "lat": "59.0000",
        "long": "26.0000"
    },
    "eg": {
        "lat": "27.0000",
        "long": "30.0000"
    },
    "eh": {
        "lat": "24.5000",
        "long": "-13.0000"
    },
    "er": {
        "lat": "15.0000",
        "long": "39.0000"
    },
    "es": {
        "lat": "40.0000",
        "long": "-4.0000"
    },
    "et": {
        "lat": "8.0000",
        "long": "38.0000"
    },
    "eu": {
        "lat": "47.0000",
        "long": "8.0000"
    },
    "fi": {
        "lat": "64.0000",
        "long": "26.0000"
    },
    "fj": {
        "lat": "-18.0000",
        "long": "175.0000"
    },
    "fk": {
        "lat": "-51.7500",
        "long": "-59.0000"
    },
    "fm": {
        "lat": "6.9167",
        "long": "158.2500"
    },
    "fo": {
        "lat": "62.0000",
        "long": "-7.0000"
    },
    "fr": {
        "lat": "46.0000",
        "long": "2.0000"
    },
    "ga": {
        "lat": "-1.0000",
        "long": "11.7500"
    },
    "gb": {
        "lat": "54.0000",
        "long": "-2.0000"
    },
    "gd": {
        "lat": "12.1167",
        "long": "-61.6667"
    },
    "ge": {
        "lat": "42.0000",
        "long": "43.5000"
    },
    "gf": {
        "lat": "4.0000",
        "long": "-53.0000"
    },
    "gh": {
        "lat": "8.0000",
        "long": "-2.0000"
    },
    "gi": {
        "lat": "36.1833",
        "long": "-5.3667"
    },
    "gl": {
        "lat": "72.0000",
        "long": "-40.0000"
    },
    "gm": {
        "lat": "13.4667",
        "long": "-16.5667"
    },
    "gn": {
        "lat": "11.0000",
        "long": "-10.0000"
    },
    "gp": {
        "lat": "16.2500",
        "long": "-61.5833"
    },
    "gq": {
        "lat": "2.0000",
        "long": "10.0000"
    },
    "gr": {
        "lat": "39.0000",
        "long": "22.0000"
    },
    "gs": {
        "lat": "-54.5000",
        "long": "-37.0000"
    },
    "gt": {
        "lat": "15.5000",
        "long": "-90.2500"
    },
    "gu": {
        "lat": "13.4667",
        "long": "144.7833"
    },
    "gw": {
        "lat": "12.0000",
        "long": "-15.0000"
    },
    "gy": {
        "lat": "5.0000",
        "long": "-59.0000"
    },
    "hk": {
        "lat": "22.2500",
        "long": "114.1667"
    },
    "hm": {
        "lat": "-53.1000",
        "long": "72.5167"
    },
    "hn": {
        "lat": "15.0000",
        "long": "-86.5000"
    },
    "hr": {
        "lat": "45.1667",
        "long": "15.5000"
    },
    "ht": {
        "lat": "19.0000",
        "long": "-72.4167"
    },
    "hu": {
        "lat": "47.0000",
        "long": "20.0000"
    },
    "id": {
        "lat": "-5.0000",
        "long": "120.0000"
    },
    "ie": {
        "lat": "53.0000",
        "long": "-8.0000"
    },
    "il": {
        "lat": "31.5000",
        "long": "34.7500"
    },
    "in": {
        "lat": "20.0000",
        "long": "77.0000"
    },
    "io": {
        "lat": "-6.0000",
        "long": "71.5000"
    },
    "iq": {
        "lat": "33.0000",
        "long": "44.0000"
    },
    "ir": {
        "lat": "32.0000",
        "long": "53.0000"
    },
    "is": {
        "lat": "65.0000",
        "long": "-18.0000"
    },
    "it": {
        "lat": "42.8333",
        "long": "12.8333"
    },
    "jm": {
        "lat": "18.2500",
        "long": "-77.5000"
    },
    "jo": {
        "lat": "31.0000",
        "long": "36.0000"
    },
    "jp": {
        "lat": "36.0000",
        "long": "138.0000"
    },
    "ke": {
        "lat": "1.0000",
        "long": "38.0000"
    },
    "kg": {
        "lat": "41.0000",
        "long": "75.0000"
    },
    "kh": {
        "lat": "13.0000",
        "long": "105.0000"
    },
    "ki": {
        "lat": "1.4167",
        "long": "173.0000"
    },
    "km": {
        "lat": "-12.1667",
        "long": "44.2500"
    },
    "kn": {
        "lat": "17.3333",
        "long": "-62.7500"
    },
    "kp": {
        "lat": "40.0000",
        "long": "127.0000"
    },
    "kr": {
        "lat": "37.0000",
        "long": "127.5000"
    },
    "kw": {
        "lat": "29.3375",
        "long": "47.6581"
    },
    "ky": {
        "lat": "19.5000",
        "long": "-80.5000"
    },
    "kz": {
        "lat": "48.0000",
        "long": "68.0000"
    },
    "la": {
        "lat": "18.0000",
        "long": "105.0000"
    },
    "lb": {
        "lat": "33.8333",
        "long": "35.8333"
    },
    "lc": {
        "lat": "13.8833",
        "long": "-61.1333"
    },
    "li": {
        "lat": "47.1667",
        "long": "9.5333"
    },
    "lk": {
        "lat": "7.0000",
        "long": "81.0000"
    },
    "lr": {
        "lat": "6.5000",
        "long": "-9.5000"
    },
    "ls": {
        "lat": "-29.5000",
        "long": "28.5000"
    },
    "lt": {
        "lat": "56.0000",
        "long": "24.0000"
    },
    "lu": {
        "lat": "49.7500",
        "long": "6.1667"
    },
    "lv": {
        "lat": "57.0000",
        "long": "25.0000"
    },
    "ly": {
        "lat": "25.0000",
        "long": "17.0000"
    },
    "ma": {
        "lat": "32.0000",
        "long": "-5.0000"
    },
    "mc": {
        "lat": "43.7333",
        "long": "7.4000"
    },
    "md": {
        "lat": "47.0000",
        "long": "29.0000"
    },
    "me": {
        "lat": "42.0000",
        "long": "19.0000"
    },
    "mg": {
        "lat": "-20.0000",
        "long": "47.0000"
    },
    "mh": {
        "lat": "9.0000",
        "long": "168.0000"
    },
    "mk": {
        "lat": "41.8333",
        "long": "22.0000"
    },
    "ml": {
        "lat": "17.0000",
        "long": "-4.0000"
    },
    "mm": {
        "lat": "22.0000",
        "long": "98.0000"
    },
    "mn": {
        "lat": "46.0000",
        "long": "105.0000"
    },
    "mo": {
        "lat": "22.1667",
        "long": "113.5500"
    },
    "mp": {
        "lat": "15.2000",
        "long": "145.7500"
    },
    "mq": {
        "lat": "14.6667",
        "long": "-61.0000"
    },
    "mr": {
        "lat": "20.0000",
        "long": "-12.0000"
    },
    "ms": {
        "lat": "16.7500",
        "long": "-62.2000"
    },
    "mt": {
        "lat": "35.8333",
        "long": "14.5833"
    },
    "mu": {
        "lat": "-20.2833",
        "long": "57.5500"
    },
    "mv": {
        "lat": "3.2500",
        "long": "73.0000"
    },
    "mw": {
        "lat": "-13.5000",
        "long": "34.0000"
    },
    "mx": {
        "lat": "23.0000",
        "long": "-102.0000"
    },
    "my": {
        "lat": "2.5000",
        "long": "112.5000"
    },
    "mz": {
        "lat": "-18.2500",
        "long": "35.0000"
    },
    "na": {
        "lat": "-22.0000",
        "long": "17.0000"
    },
    "nc": {
        "lat": "-21.5000",
        "long": "165.5000"
    },
    "ne": {
        "lat": "16.0000",
        "long": "8.0000"
    },
    "nf": {
        "lat": "-29.0333",
        "long": "167.9500"
    },
    "ng": {
        "lat": "10.0000",
        "long": "8.0000"
    },
    "ni": {
        "lat": "13.0000",
        "long": "-85.0000"
    },
    "nl": {
        "lat": "52.5000",
        "long": "5.7500"
    },
    "no": {
        "lat": "62.0000",
        "long": "10.0000"
    },
    "np": {
        "lat": "28.0000",
        "long": "84.0000"
    },
    "nr": {
        "lat": "-0.5333",
        "long": "166.9167"
    },
    "nu": {
        "lat": "-19.0333",
        "long": "-169.8667"
    },
    "nz": {
        "lat": "-41.0000",
        "long": "174.0000"
    },
    "om": {
        "lat": "21.0000",
        "long": "57.0000"
    },
    "pa": {
        "lat": "9.0000",
        "long": "-80.0000"
    },
    "pe": {
        "lat": "-10.0000",
        "long": "-76.0000"
    },
    "pf": {
        "lat": "-15.0000",
        "long": "-140.0000"
    },
    "pg": {
        "lat": "-6.0000",
        "long": "147.0000"
    },
    "ph": {
        "lat": "13.0000",
        "long": "122.0000"
    },
    "pk": {
        "lat": "30.0000",
        "long": "70.0000"
    },
    "pl": {
        "lat": "52.0000",
        "long": "20.0000"
    },
    "pm": {
        "lat": "46.8333",
        "long": "-56.3333"
    },
    "pr": {
        "lat": "18.2500",
        "long": "-66.5000"
    },
    "ps": {
        "lat": "32.0000",
        "long": "35.2500"
    },
    "pt": {
        "lat": "39.5000",
        "long": "-8.0000"
    },
    "pw": {
        "lat": "7.5000",
        "long": "134.5000"
    },
    "py": {
        "lat": "-23.0000",
        "long": "-58.0000"
    },
    "qa": {
        "lat": "25.5000",
        "long": "51.2500"
    },
    "re": {
        "lat": "-21.1000",
        "long": "55.6000"
    },
    "ro": {
        "lat": "46.0000",
        "long": "25.0000"
    },
    "rs": {
        "lat": "44.0000",
        "long": "21.0000"
    },
    "ru": {
        "lat": "60.0000",
        "long": "100.0000"
    },
    "rw": {
        "lat": "-2.0000",
        "long": "30.0000"
    },
    "sa": {
        "lat": "25.0000",
        "long": "45.0000"
    },
    "sb": {
        "lat": "-8.0000",
        "long": "159.0000"
    },
    "sc": {
        "lat": "-4.5833",
        "long": "55.6667"
    },
    "sd": {
        "lat": "15.0000",
        "long": "30.0000"
    },
    "se": {
        "lat": "62.0000",
        "long": "15.0000"
    },
    "sg": {
        "lat": "1.3667",
        "long": "103.8000"
    },
    "sh": {
        "lat": "-15.9333",
        "long": "-5.7000"
    },
    "si": {
        "lat": "46.0000",
        "long": "15.0000"
    },
    "sj": {
        "lat": "78.0000",
        "long": "20.0000"
    },
    "sk": {
        "lat": "48.6667",
        "long": "19.5000"
    },
    "sl": {
        "lat": "8.5000",
        "long": "-11.5000"
    },
    "sm": {
        "lat": "43.7667",
        "long": "12.4167"
    },
    "sn": {
        "lat": "14.0000",
        "long": "-14.0000"
    },
    "so": {
        "lat": "10.0000",
        "long": "49.0000"
    },
    "sr": {
        "lat": "4.0000",
        "long": "-56.0000"
    },
    "st": {
        "lat": "1.0000",
        "long": "7.0000"
    },
    "sv": {
        "lat": "13.8333",
        "long": "-88.9167"
    },
    "sy": {
        "lat": "35.0000",
        "long": "38.0000"
    },
    "sz": {
        "lat": "-26.5000",
        "long": "31.5000"
    },
    "tc": {
        "lat": "21.7500",
        "long": "-71.5833"
    },
    "td": {
        "lat": "15.0000",
        "long": "19.0000"
    },
    "tf": {
        "lat": "-43.0000",
        "long": "67.0000"
    },
    "tg": {
        "lat": "8.0000",
        "long": "1.1667"
    },
    "th": {
        "lat": "15.0000",
        "long": "100.0000"
    },
    "tj": {
        "lat": "39.0000",
        "long": "71.0000"
    },
    "tk": {
        "lat": "-9.0000",
        "long": "-172.0000"
    },
    "tm": {
        "lat": "40.0000",
        "long": "60.0000"
    },
    "tn": {
        "lat": "34.0000",
        "long": "9.0000"
    },
    "to": {
        "lat": "-20.0000",
        "long": "-175.0000"
    },
    "tr": {
        "lat": "39.0000",
        "long": "35.0000"
    },
    "tt": {
        "lat": "11.0000",
        "long": "-61.0000"
    },
    "tv": {
        "lat": "-8.0000",
        "long": "178.0000"
    },
    "tw": {
        "lat": "23.5000",
        "long": "121.0000"
    },
    "tz": {
        "lat": "-6.0000",
        "long": "35.0000"
    },
    "ua": {
        "lat": "49.0000",
        "long": "32.0000"
    },
    "ug": {
        "lat": "1.0000",
        "long": "32.0000"
    },
    "um": {
        "lat": "19.2833",
        "long": "166.6000"
    },
    "us": {
        "lat": "38.0000",
        "long": "-97.0000"
    },
    "uy": {
        "lat": "-33.0000",
        "long": "-56.0000"
    },
    "uz": {
        "lat": "41.0000",
        "long": "64.0000"
    },
    "va": {
        "lat": "41.9000",
        "long": "12.4500"
    },
    "vc": {
        "lat": "13.2500",
        "long": "-61.2000"
    },
    "ve": {
        "lat": "8.0000",
        "long": "-66.0000"
    },
    "vg": {
        "lat": "18.5000",
        "long": "-64.5000"
    },
    "vi": {
        "lat": "18.3333",
        "long": "-64.8333"
    },
    "vn": {
        "lat": "16.0000",
        "long": "106.0000"
    },
    "vu": {
        "lat": "-16.0000",
        "long": "167.0000"
    },
    "wf": {
        "lat": "-13.3000",
        "long": "-176.2000"
    },
    "ws": {
        "lat": "-13.5833",
        "long": "-172.3333"
    },
    "ye": {
        "lat": "15.0000",
        "long": "48.0000"
    },
    "yt": {
        "lat": "-12.8333",
        "long": "45.1667"
    },
    "za": {
        "lat": "-29.0000",
        "long": "24.0000"
    },
    "zm": {
        "lat": "-15.0000",
        "long": "30.0000"
    },
    "zw": {
        "lat": "-20.0000",
        "long": "30.0000"
    }
}

export  const distance = (lat1, lng1, lat2, lng2)  => {
    lat1 *= Math.PI / 180;
    lng1 *= Math.PI / 180;
    lat2 *= Math.PI / 180;
    lng2 *= Math.PI / 180;
    
    return Math.round(6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2)));
  }

export const convertCountryName = (country) => {
    if (isoCountries.hasOwnProperty(country)) {
        return isoCountries[country].toLowerCase();;
    } else {
        return country;
    }
}

export const getCountryPosition = (country) => {
    if (countryLocation.hasOwnProperty(country)) {
        return countryLocation[country];
    } else {
        return country;
    }
}

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};


export const ageCalculater = (birth) => {
    return getAge(getAgeString(birth))
}

export const getAgeString = (birth) => {
    const string = birth.toString();
    const array = []
    array.push(`${string[0]}${string[1]}${string[2]}${string[3]}`);
    array.push(`${string[4]}${string[5]}`);
    array.push(`${string[6]}${string[7]}`);

    return array.join("-")
}

export const getDate = (age,type) => {
    const Year= type === "max"? new Date().getFullYear()-age-1 : new Date().getFullYear()-age; 
    const Month=("0"+(new Date().getMonth() + 1)).slice(-2);  
    const Day=("0"+new Date().getDate()).slice(-2);
    const birthString =`${Year}${Month}${Day}`
    return(parseInt(birthString))
}

export const getOneYearAgo = (day) => {
    const monthDay = day.toString().slice(4)
    const year = (parseInt(day.toString().slice(0,4))-1).toString()
    const newDate = parseInt(year + monthDay)
    return(newDate)
}
