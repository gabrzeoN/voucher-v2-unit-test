import { faker } from "@faker-js/faker";

export function generateVoucher(){
    const voucher = {
        code: faker.random.alphaNumeric(5),
        discount: parseInt(faker.random.numeric(2))
    }
    return voucher;
}