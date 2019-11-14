//
//  ReceiptsViewManager.swift
//  PleoChallenge
//
//  Created by Furkan Cengiz on 14.11.2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation

@objc(ReceiptsViewManager)
class ReceiptsViewManager: RCTViewManager {
  override func view() -> UIView! {
    return ReceiptsView()
  }
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
