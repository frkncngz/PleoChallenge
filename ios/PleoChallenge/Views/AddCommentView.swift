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
  private var titleSeparatorView: UIView!
  private var textView: UITextView!
  private var buttonSeparatorView: UIView!
  private var addButton: UIButton!
  private var betweenButtonsSeparatorView: UIView!
  private var closeButton: UIButton!
  
  @objc var onTextSubmit: RCTDirectEventBlock?
  @objc var onClose: RCTDirectEventBlock?
  
  @objc var merchant: NSString = "" {
    didSet {
      titleLabel.text = "Add Comment to \(merchant)"
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
    
    titleSeparatorView = separatorView()
    addSubview(titleSeparatorView)
    
    textView = UITextView()
    textView.font = UIFont.systemFont(ofSize: 16)
    addSubview(textView)
    
    buttonSeparatorView = separatorView()
    addSubview(buttonSeparatorView)
    
    addButton = UIButton(type: .custom)
    addButton.setTitleColor(.black, for: .normal)
    addSubview(addButton)
    
    betweenButtonsSeparatorView = separatorView()
    addSubview(betweenButtonsSeparatorView)
    
    closeButton = UIButton(type: .custom)
    closeButton.setTitleColor(.black, for: .normal)
    addSubview(closeButton)
    
    // MARK: ui
    setNeedsUpdateConstraints()
    
    // MARK: localization
    addButton.setTitle("Add Comment", for: .normal)
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
      make.top.equalTo(self).offset(10)
      make.leading.trailing.equalTo(self)
    }
    titleSeparatorView.snp.updateConstraints { (make) in
      make.top.equalTo(titleLabel.snp.bottom).offset(10)
      make.leading.equalTo(self).offset(5)
      make.trailing.equalTo(self).offset(-5)
      make.height.equalTo(0.5)
    }
    textView.snp.updateConstraints { (make) in
      make.top.equalTo(titleSeparatorView.snp.bottom).offset(5)
      make.leading.trailing.equalTo(self)
    }
    buttonSeparatorView.snp.updateConstraints { (make) in
      make.top.equalTo(textView.snp.bottom).offset(5)
      make.leading.trailing.height.equalTo(titleSeparatorView)
    }
    addButton.snp.updateConstraints { (make) in
      make.height.equalTo(40)
      make.leading.equalTo(self)
      make.centerY.equalTo(betweenButtonsSeparatorView)
      make.trailing.equalTo(betweenButtonsSeparatorView.snp.leading)
    }
    betweenButtonsSeparatorView.snp.updateConstraints { (make) in
      make.top.equalTo(buttonSeparatorView.snp.bottom).offset(5)
      make.bottom.equalTo(self).offset(-5)
      make.width.equalTo(0.5)
      make.height.equalTo(40)
      make.centerX.equalTo(self)
    }
    closeButton.snp.updateConstraints { (make) in
      make.height.centerY.equalTo(addButton)
      make.leading.equalTo(betweenButtonsSeparatorView.snp.trailing)
      make.trailing.equalTo(self)
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
