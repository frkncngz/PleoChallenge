//
//  ReceiptsView.swift
//  PleoChallenge
//
//  Created by Furkan Cengiz on 14.11.2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

import UIKit
import SnapKit
import Kingfisher
import Agrume

class ReceiptsView: UIView {
  
  private var tableView: UITableView!
  
  @objc var receipts: NSArray = [] {
    didSet {
      tableView.reloadData()
    }
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  override init(frame: CGRect) {
    super.init(frame: frame)
        
    // MARK: setup
    backgroundColor = UIColor(rgb:0xf8f8f8)
    
    tableView = UITableView()
    tableView.backgroundColor = UIColor(rgb:0xf8f8f8)
    tableView.separatorStyle = .none
    tableView.dataSource = self
    tableView.delegate = self
    tableView.rowHeight = UITableView.automaticDimension
    tableView.estimatedRowHeight = 300
    tableView.register(ReceiptsViewTableViewCell.self, forCellReuseIdentifier: NSStringFromClass(ReceiptsViewTableViewCell.self))
    tableView.tableFooterView = UIView()
    addSubview(tableView)
        
    
    // MARK: ui
    setNeedsUpdateConstraints()
    
    // MARK: localization
    
    // MARK: bindings
    
    // MARK: actions
    
    // MARK: routing
  }
  
  // MARK: - UI
  override func updateConstraints() {
    tableView.snp.updateConstraints { (make) in
      make.edges.equalTo(self)
    }
    super.updateConstraints()
  }
}

extension ReceiptsView: UITableViewDataSource {
  func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return receipts.count
  }
  func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: NSStringFromClass(ReceiptsViewTableViewCell.self), for: indexPath) as! ReceiptsViewTableViewCell
    if let url = receipts[indexPath.row] as? String {
      cell.setReceipt(url: url)
    }
    return cell
  }
}

extension ReceiptsView: UITableViewDelegate {
  func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
    return 300
  }
  func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    tableView.deselectRow(at: indexPath, animated: true)
    guard let urlString = receipts[indexPath.row] as? String else {
      return
    }
    guard let url = URL(string: urlString) else {
      return
    }
        
    ImageDownloader.default.downloadImage(with: url, retrieveImageTask: nil, options: nil, progressBlock: nil) { (image, error, url, data) in
      if let image = image {
        let button = UIBarButtonItem(barButtonSystemItem: .stop, target: nil, action: nil)
        button.tintColor = .white
        let agrume = Agrume(image: image, background: .colored(UIColor.black.withAlphaComponent(0.8)), dismissal: .withButton(button))
        agrume.show(from: self.parentViewController!)
      }
    }
  }
}

extension UIResponder {
    public var parentViewController: UIViewController? {
        return next as? UIViewController ?? next?.parentViewController
    }
}
