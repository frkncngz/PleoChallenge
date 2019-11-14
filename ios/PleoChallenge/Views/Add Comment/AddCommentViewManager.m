//
//  AddCommentViewManager.m
//  PleoChallenge
//
//  Created by Furkan Cengiz on 7.11.2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "React/RCTViewManager.h"
@interface RCT_EXTERN_MODULE(AddCommentViewManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(merchant, NSString)
RCT_EXPORT_VIEW_PROPERTY(onTextSubmit, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onClose, RCTDirectEventBlock)
RCT_EXTERN_METHOD(
  updateFromManager:(nonnull NSNumber *)node
)
@end
