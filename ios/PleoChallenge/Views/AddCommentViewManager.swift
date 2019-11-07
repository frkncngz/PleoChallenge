//
//  AddCommentViewManager.swift
//  PleoChallenge
//
//  Created by Furkan Cengiz on 7.11.2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation

@objc(AddCommentViewManager)
class AddCommentViewManager: RCTViewManager {
  override func view() -> UIView! {
    return AddCommentView()
  }
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc func updateFromManager(_ node: NSNumber) {
    DispatchQueue.main.async {
      let component = self.bridge.uiManager.view(
        forReactTag: node
      ) as! AddCommentView
      component.onAppear()
    }
  }
}
