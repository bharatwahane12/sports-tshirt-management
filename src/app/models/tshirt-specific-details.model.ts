export interface TShirtSpecificDetails {
    nameOnTShirt: string | null | undefined;
    sizeOfTShirt: string | null | undefined;
    color: string | null | undefined;
    printInfoFront: string | null | undefined;
    printInfoBack: string | null | undefined | number;
    logoOrDesign: string | boolean | null | undefined;
    catalogueNumber: string | null | undefined | number;
    price: string | null | undefined | number;
}