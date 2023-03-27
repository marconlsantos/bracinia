import { component$, useContext } from "@builder.io/qwik";
import type { Address } from "~/domain/valueobjects/Address";
import { BRCN } from "~/routes/context";

export const BreweryCard = component$(() => {
    const braciniaData = useContext(BRCN);
    const brewery = braciniaData.currentBrewery;

    return <div class="overflow-hidden bg-white shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
            <h3 class="text-base font-semibold leading-6 text-gray-900">{brewery.name}</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">{brewery.type}</p>
        </div>
        <div class="border-t border-gray-200">
            <dl>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Address</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <address>
                            {brewery.address && <AddressCard address={brewery.address} />}
                        </address>
                    </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Telephone</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <address>
                            {brewery.phone}
                        </address>
                    </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Website</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {brewery.websiteUrl}
                    </dd>
                </div>
            </dl>
        </div>
    </div>;

});

const AddressCard = (props: { address: Address; }) => {
    return <>
        <div>{props.address.Value.street}</div>
        {props.address.Value.address_2 && <div>{props.address.Value.address_2}</div>}
        {props.address.Value.address_3 && <div>{props.address.Value.address_3}</div>}
        {props.address.Value.city && <div>{props.address.Value.city + ' ' + props.address.Value.postal_code}</div>}
        {props.address.Value.county_province && <div>{props.address.Value.county_province}</div>}
        {props.address.Value.state && <div>{props.address.Value.state}</div>}
        {props.address.Value.country && <div>{props.address.Value.country}</div>}
    </>;
};