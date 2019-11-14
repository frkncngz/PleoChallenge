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
  
  private var receiptImageView: UIImageView!
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  override init(style: UITableViewCell.CellStyle, reuseIdentifier: String!) {
    super.init(style: style, reuseIdentifier: reuseIdentifier)
    
    // MARK: setup
    selectionStyle = .none
    
    receiptImageView = UIImageView()
    receiptImageView.clipsToBounds = true
    receiptImageView.contentMode = .scaleAspectFit
    contentView.addSubview(receiptImageView)
    
    // MARK: ui
    setNeedsUpdateConstraints()
    
    // MARK: localization
    
    // MARK: actions
    
    // MARK: bindings
    
    // MARK: routing
    
  }
  
  //MARK: UI
  override func updateConstraints() {
    receiptImageView.snp.updateConstraints { (make) in
      make.edges.equalTo(contentView).inset(UIEdgeInsets.init(top: 5, left: 10, bottom: 5, right: 10))
    }
    super.updateConstraints()
  }
  
  //MARK: Functions
  func setReceipt(url: String) {    
    receiptImageView.kf.setImage(with: URL(string: url))
  }
}

