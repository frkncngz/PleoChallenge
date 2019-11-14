//
//  ReceiptsViewTableViewCell.swift
//  PleoChallenge
//
//  Created by Furkan Cengiz on 14.11.2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

import UIKit
import SnapKit
import Kingfisher

class ReceiptsViewTableViewCell: UITableViewCell {
  
  private var containerView: UIView!
  private var receiptImageView: UIImageView!
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  override init(style: UITableViewCell.CellStyle, reuseIdentifier: String!) {
    super.init(style: style, reuseIdentifier: reuseIdentifier)
    
    // MARK: setup    
    backgroundColor = .clear
    selectionStyle = .none
    
    containerView = UIView()
    containerView.backgroundColor = .white
    containerView.layer.cornerRadius = 2
    containerView.layer.shadowColor = UIColor.white.withAlphaComponent(0.6).cgColor
    containerView.layer.shadowOpacity = 1
    containerView.layer.shadowOffset = CGSize(width: 0, height: 6)
    containerView.layer.shadowRadius = 6
    containerView.layer.shadowPath = nil
    contentView.addSubview(containerView)
    
    receiptImageView = UIImageView()
    receiptImageView.clipsToBounds = true
    receiptImageView.layer.masksToBounds = true
    receiptImageView.contentMode = .scaleAspectFill
    receiptImageView.layer.cornerRadius = 2
    receiptImageView.layer.shadowColor = UIColor.white.withAlphaComponent(0.6).cgColor
    receiptImageView.layer.shadowOpacity = 1
    receiptImageView.layer.shadowOffset = CGSize(width: 0, height: 6)
    receiptImageView.layer.shadowRadius = 6
    receiptImageView.layer.shadowPath = nil
    containerView.addSubview(receiptImageView)
    
    // MARK: ui
    setNeedsUpdateConstraints()
    
    // MARK: localization
    
    // MARK: actions
    
    // MARK: bindings
    
    // MARK: routing
    
  }
  
  //MARK: UI
  override func updateConstraints() {
    containerView.snp.updateConstraints { (make) in
      make.edges.equalTo(contentView).inset(UIEdgeInsets.init(top: 5, left: 10, bottom: 5, right: 10))
    }
    receiptImageView.snp.updateConstraints { (make) in
      make.edges.equalTo(containerView).inset(UIEdgeInsets.init(top: 10, left: 10, bottom: 10, right: 10))
    }
    super.updateConstraints()
  }
  
  //MARK: Functions
  func setReceipt(url: String) {    
    receiptImageView.kf.setImage(with: URL(string: url))
  }
}

