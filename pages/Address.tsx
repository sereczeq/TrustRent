import React, {useState} from "react";

interface country {
    id_country: number,
    name: string,
}

interface city {
    id_city: number,
    id_region: number,
    name: string,
}

interface street {
    id_street: number,
    id_area: number,
    name: string
}

interface address {
    id_number: number,
    number: number,
}

const AddressForm = () => {

    const [country, setCountry] = useState('');
    const [theCountry, setTheCountry] = useState<country | null>()

    const checkCountry = (event: React.FormEvent<HTMLInputElement>) => {
        const name = event.currentTarget.value;
        setCountry(name)
        fetch(`http://localhost:3000/api/address/${name}`)
            .then((response) => {
                    response.json().then((data) => {
                        let countries = data as country[]
                        if (countries.length === 1) {
                            setTheCountry(countries[0]);
                        } else {
                            setTheCountry(null)
                        }
                    })
                }
            )
    }

    const [city, setCity] = useState('')
    const [theCity, setTheCity] = useState<city | null>(null);

    const checkCity = (event: React.FormEvent<HTMLInputElement>) => {
        const name = event.currentTarget.value;
        setCity(name)
        if (!theCountry) return;
        fetch(`http://localhost:3000/api/address/${theCountry.id_country}/${name}`)
            .then((response) => {
                    response.json().then((data) => {
                        let cities = data as city[]
                        if (cities.length === 1) {
                            setTheCity(cities[0]);
                        } else {
                            setTheCity(null)
                        }
                    })
                }
            )
    }

    const [street, setStreet] = useState('')
    const [theStreet, setTheStreet] = useState<street | null>(null)

    const checkStreet = (event: React.FormEvent<HTMLInputElement>) => {
        const name = event.currentTarget.value;
        setStreet(name)
        if (!theCountry) return;
        if (!theCity) return;
        fetch(`http://localhost:3000/api/address/${theCountry.id_country}/${theCity.id_city}/${name}`)
            .then((response) => {
                    response.json().then((data) => {
                        let streets = data as street[]
                        if (streets.length === 1) {
                            setTheStreet(streets[0]);
                        } else {
                            setTheStreet(null)
                        }
                    })
                }
            )
    }

    const [address, setAddress] = useState('')
    const [theAddress, setTheAddress] = useState<address | null>(null);

    const checkAddress = (event: React.FormEvent<HTMLInputElement>) => {
        const name = event.currentTarget.value;
        setAddress(name)
        if (!theCountry) return;
        if (!theCity) return;
        if (!theStreet) return;
        fetch(`http://localhost:3000/api/address/${theCountry.id_country}/${theCity.id_city}/${theStreet.id_street}/${name}`)
            .then((response) => {
                    response.json().then((data) => {
                        let addresses = data as address[]
                        if (address.length === 1) {
                            setTheAddress(addresses[0]);
                        } else {
                            setTheAddress(null)
                        }
                    })
                }
            )
    }

    return (
        <div>
            <label>
            <input value={country} onChange={checkCountry}/>
                 - country
            </label>
            {theCountry ? <div>
                <label>
                <input value={city} onChange={checkCity}/>
                - city</label>
                {theCity ? <div>
                    <label>
                    <input value={street} onChange={checkStreet}/>
                    - street</label>
                    {theStreet ? <div>
                        <label>
                        <input value={address} onChange={checkAddress}/>
                        - number</label>
                        {theAddress ? <div>
                            <p>Your address
                                is: {theCountry.name}, {theCity.name} ul. {theStreet.name} {theAddress.number}</p>
                        </div> : <p>waiting for input</p>}
                    </div> : <p>waiting for input</p>}
                </div> : <p>waiting for input</p>}
            </div> : <p>Waiting for input</p>}
        </div>
    )
}

export default AddressForm;