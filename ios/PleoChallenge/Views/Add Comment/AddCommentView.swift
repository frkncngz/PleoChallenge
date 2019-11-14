//
//  AddCommentView.swift
//  PleoChallenge
//
//  Created by Furkan Cengiz on 7.11.2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

import UIKit
import SnapKit

class AddCommentView: UIView {
  
  private var titleLabel: UILabel!
  private var textView: UITextView!
  private var addButton: UIButton!
  private var closeButton: UIButton!
  
  @objc var onTextSubmit: RCTDirectEventBlock?
  @objc var onClose: RCTDirectEventBlock?
  
  @objc var merchant: NSString = "" {
    didSet {
      let paragraphStyle = NSMutableParagraphStyle()
      paragraphStyle.alignment = .center
      paragraphStyle.minimumLineHeight = 28
                  
      let attributes = [NSAttributedString.Key.font: UIFont.boldSystemFont(ofSize: 24),
        NSAttributedString.Key.paragraphStyle: paragraphStyle,
        NSAttributedString.Key.foregroundColor: UIColor(rgb:0x494949)]
      let attrString = NSAttributedString(string:"Add Comment", attributes: attributes)
      titleLabel.attributedText = attrString
      
      textView.placeholder = "Type here (\(merchant))..."
    }
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    
    // MARK: setup
    backgroundColor = .white
    layer.borderWidth = 0.5
    layer.borderColor = UIColor(rgb: 0xb3b3b3).cgColor
    layer.cornerRadius = 6
    
    titleLabel = UILabel()
    titleLabel.font = UIFont.boldSystemFont(ofSize: 20)
    titleLabel.numberOfLines = 0
    titleLabel.textAlignment = .center
    addSubview(titleLabel)
    
    textView = UITextView()
    textView.textContainerInset = UIEdgeInsets.init(top: 15, left: 15, bottom: 10, right: 15)
    textView.backgroundColor = UIColor(rgb:0xefefef)
    textView.font = UIFont.systemFont(ofSize: 16)
    textView.textColor = UIColor(rgb:0x494949)
    addSubview(textView)
    
    addButton = UIButton(type: .custom)
    addButton.layer.cornerRadius = 6
    addButton.backgroundColor = UIColor(rgb:0x74e09a)
    addButton.setTitleColor(.white, for: .normal)
    addButton.titleLabel!.font = UIFont.boldSystemFont(ofSize: 18)
    addSubview(addButton)
    
    closeButton = UIButton(type: .custom)
    closeButton.setTitleColor(UIColor(rgb:0x494949), for: .normal)
    closeButton.titleLabel!.font = UIFont.boldSystemFont(ofSize: 18)
    addSubview(closeButton)
    
    // MARK: ui
    setNeedsUpdateConstraints()
    
    // MARK: localization
    addButton.setTitle("Submit", for: .normal)
    closeButton.setTitle("Close", for: .normal)
    
    // MARK: bindings
    addButton.addTarget(self, action: #selector(actionAddComment(sender:)), for: .touchUpInside)
    closeButton.addTarget(self, action: #selector(actionClose(sender:)), for: .touchUpInside)
    
    // MARK: actions
    
    // MARK: routing
  }
  
  // MARK: - UI
  override func updateConstraints() {
    titleLabel.snp.updateConstraints { (make) in
      make.top.equalTo(self).offset(20)
      make.leading.trailing.equalTo(self)
    }
    textView.snp.updateConstraints { (make) in
      make.top.equalTo(titleLabel.snp.bottom).offset(20)
      make.height.equalTo(120)
      make.leading.equalTo(self).offset(15)
      make.trailing.equalTo(self).offset(-15)
    }
    addButton.snp.updateConstraints { (make) in
      make.top.equalTo(textView.snp.bottom).offset(32)
      make.height.equalTo(50)
      make.leading.equalTo(self).offset(40)
      make.trailing.equalTo(self).offset(-40)
    }
    closeButton.snp.updateConstraints { (make) in
      make.top.equalTo(addButton.snp.bottom)
      make.height.leading.trailing.equalTo(addButton)
    }
    super.updateConstraints()
  }
  
  func separatorView() -> UIView {
    let separatorView = UIView()
    separatorView.backgroundColor = UIColor(rgb: 0xb3b3b3)
    return separatorView
  }
  
  // MARK: Actions
  @objc func actionAddComment(sender: UIButton?) {
    if let onTextSubmit = onTextSubmit {
      onTextSubmit(["comment": textView.text])
    }
  }
  
  @objc func actionClose(sender: UIButton?) {
    if let onClose = onClose {
      onClose([:])
    }
  }
  
  // MARK: Methods
  @objc func onAppear() {
    textView.becomeFirstResponder()
  }
}
