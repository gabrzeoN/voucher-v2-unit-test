import * as voucherFactory from "../factories/voucherFactory.js";
import voucherRepository from './../../src/repositories/voucherRepository.js';
import voucherService from "../../src/services/voucherService.js";

import { jest } from "@jest/globals";

describe("voucherService test suite", () => {
  it("should create a voucher", async () => {
    const voucher = voucherFactory.generateVoucher();
    jest.spyOn(voucherRepository, "getVoucherByCode").mockImplementationOnce((voucher): any => {
      return null;
    });
    jest.spyOn(voucherRepository, "createVoucher").mockImplementationOnce(null);
    await voucherService.createVoucher(voucher.code, voucher.discount);
    expect(voucherRepository.createVoucher).toHaveBeenCalled();
  })

  it("should not create a voucher", async () => {
    const voucher = voucherFactory.generateVoucher();
    jest.spyOn(voucherRepository, "getVoucherByCode").mockImplementationOnce((voucher): any => {
      return voucher;
    });
    jest.spyOn(voucherRepository, "createVoucher").mockImplementationOnce(null);
    // await voucherService.createVoucher(voucher.code, voucher.discount);
    // expect(voucherRepository.createVoucher).not.toBeCalled();
    await expect(
      voucherService.createVoucher(voucher.code, voucher.discount)
      ).rejects.toEqual({ type: "conflict", message: "Voucher already exist." }); 
  })
})